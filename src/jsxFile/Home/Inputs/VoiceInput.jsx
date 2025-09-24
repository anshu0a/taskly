import React, { useState, useRef, useEffect } from "react";
import '../../../cssFile/Home-css/AddingONeTask.css'
export default function VoiceRecorder({ value, setvalue }) {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [count, setCount] = useState("00");
    const [isplay, setIsplay] = useState(false);
    const chunksRef = useRef([]);
    const streamRef = useRef(null);
    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const timerRef = useRef(null);

    const bars = 25;
    const barWidth = 2;
    const gap = 2;
    const radius = 4;

    // Start recording
    const startRecording = async () => {
        chunksRef.current = [];
        setvalue((pre) => ({ ...pre, voice: null }));
        setIsplay(false)
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = (e) => {
            if (e.data && e.data.size) chunksRef.current.push(e.data);
        };

        recorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: "audio/webm" });
            chunksRef.current = [];


            setvalue((pre) => ({
                ...pre,
                voice: blob,
                voicePreview: URL.createObjectURL(blob),
            }));

            if (streamRef.current) {
                streamRef.current.getTracks().forEach((t) => t.stop());
                streamRef.current = null;
            }
            setMediaRecorder(null);
        };


        recorder.start();
        setMediaRecorder(recorder);

        // reset count to 00
        setCount("00");

        // start timer for counter & auto-stop after 20s
        let seconds = 0;
        timerRef.current = setInterval(() => {
            seconds++;
            setCount((prev) => {
                const num = parseInt(prev, 10) + 1;
                return num.toString().padStart(2, "0");
            });

            if (seconds >= 20) {
                clearInterval(timerRef.current);
                if (recorder.state !== "inactive") recorder.stop();
            }
        }, 1000);
    };

    // Stop recording manually
    const stopRecording = () => {
        if (mediaRecorder) {
            clearInterval(timerRef.current);
            if (mediaRecorder.state !== "inactive") mediaRecorder.stop();
        }

    };

    // helper: draw rounded rect
    function drawRoundedRect(ctx, x, y, w, h, r) {
        const rad = Math.min(r, w / 2, h / 2);
        ctx.beginPath();
        ctx.moveTo(x + rad, y);
        ctx.lineTo(x + w - rad, y);
        ctx.arcTo(x + w, y, x + w, y + rad, rad);
        ctx.lineTo(x + w, y + h - rad);
        ctx.arcTo(x + w, y + h, x + w - rad, y + h, rad);
        ctx.lineTo(x + rad, y + h);
        ctx.arcTo(x, y + h, x, y + h - rad, rad);
        ctx.lineTo(x, y + rad);
        ctx.arcTo(x, y, x + rad, y, rad);
        ctx.closePath();
        ctx.fill();
    }

    // Visualizer effect
    useEffect(() => {
        if (!value.voice) return;
        const audio = audioRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioCtx();
        const source = audioContext.createMediaElementSource(audio);
        const analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const totalWidth = bars * (barWidth + gap) - gap;
            let x = (canvas.width - totalWidth) / 2;
            const centerY = canvas.height / 2;

            const step = Math.floor(bufferLength / bars);
            for (let i = 0; i < bars; i++) {
                const v = dataArray[i * step] || 0;
                const barHeight = Math.max((dataArray[i * step] / 255) * canvas.height, 1);


                let y = centerY - barHeight / 2;

                ctx.fillStyle = "#000000ff";
                if (typeof ctx.roundRect === "function") {
                    ctx.beginPath();
                    ctx.roundRect(x, y, barWidth, barHeight, radius);
                    ctx.fill();
                } else {
                    drawRoundedRect(ctx, x, y, barWidth, barHeight, radius);
                }

                x += barWidth + gap;
            }
        };

        audio.onplay = () => {
            audioContext.resume();
            draw();
        };
        audio.onpause = () => cancelAnimationFrame(animationRef.current);
        audio.onended = () => cancelAnimationFrame(animationRef.current);

        return () => {
            cancelAnimationFrame(animationRef.current);
            try {
                analyser.disconnect();
                source.disconnect();
                audioContext.close();
            } catch { }
        };
    }, [value.voice]);

    function playVoice() {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            setIsplay(true);
        }
    }

    function pauseVoice() {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsplay(false);
        }
    }

    useEffect(() => {
        if (audioRef.current) {
            const handleEnded = () => {
                pauseVoice();
            };
            audioRef.current.addEventListener("ended", handleEnded);

            return () => {
                if (audioRef.current)
                    audioRef.current.removeEventListener("ended", handleEnded);
            };
        }
    }, [isplay]);

    return (
        <div className="maininps gapinvoice isFlex">
            {!mediaRecorder ? (
                <svg onClick={startRecording} className="strtrec" viewBox="0 0 477 477">
                    <path d="M391.3,203.4c0-0.8,0-1.6,0-2.4c-0.1-7.5-6.3-13.4-13.7-13.3c-7.5,0.1-13.4,6.3-13.3,13.7c0,0.7,0,1.3,0,2 c0,69.3-56.4,125.8-125.8,125.8s-125.8-56.4-125.8-125.8c0-1,0-1.9,0-2.9c0.2-7.5-5.7-13.6-13.2-13.8c-7.4-0.1-13.6,5.7-13.8,13.2 c0,1.2,0,2.3,0,3.5c0,79.7,61.3,145.3,139.3,152.2V450h-55.5c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h138 c7.5,0,13.5-6,13.5-13.5s-6-13.5-13.5-13.5H252v-94.5C329.9,348.7,391.3,283.1,391.3,203.4z"></path>
                    <path d="M237,295c49.9,0,90.5-40.6,90.5-90.5v-114C327.5,40.6,286.9,0,237,0s-90.5,40.6-90.5,90.5v114 C146.5,254.4,187.1,295,237,295z M173.5,90.5c0-35,28.5-63.5,63.5-63.5s63.5,28.5,63.5,63.5v114c0,35-28.5,63.5-63.5,63.5 s-63.5-28.5-63.5-63.5V90.5z"></path>
                </svg>
            ) : (
                !value.voice && (
                    <div onClick={stopRecording} className="mikediv isFlex">
                        <svg className="stprec" viewBox="0 0 477 477">
                            <path d="M391.3,203.4c0-0.8,0-1.6,0-2.4c-0.1-7.5-6.3-13.4-13.7-13.3c-7.5,0.1-13.4,6.3-13.3,13.7c0,0.7,0,1.3,0,2 c0,69.3-56.4,125.8-125.8,125.8s-125.8-56.4-125.8-125.8c0-1,0-1.9,0-2.9c0.2-7.5-5.7-13.6-13.2-13.8c-7.4-0.1-13.6,5.7-13.8,13.2 c0,1.2,0,2.3,0,3.5c0,79.7,61.3,145.3,139.3,152.2V450h-55.5c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h138 c7.5,0,13.5-6,13.5-13.5s-6-13.5-13.5-13.5H252v-94.5C329.9,348.7,391.3,283.1,391.3,203.4z"></path>
                            <path d="M237,295c49.9,0,90.5-40.6,90.5-90.5v-114C327.5,40.6,286.9,0,237,0s-90.5,40.6-90.5,90.5v114 C146.5,254.4,187.1,295,237,295z M173.5,90.5c0-35,28.5-63.5,63.5-63.5s63.5,28.5,63.5,63.5v114c0,35-28.5,63.5-63.5,63.5 s-63.5-28.5-63.5-63.5V90.5z"></path>
                        </svg>
                        <p>0:{count}</p>
                    </div>
                )
            )}

            {value.voice && (
                <div className="canvasdiv">
                    {!isplay ?
                        <svg onClick={playVoice} className="plpu" viewBox="-4 -3 30 30" fill="none" >
                            <path d="M7.23832 3.04445C5.65196 2.1818 3.75 3.31957 3.75 5.03299L3.75 18.9672C3.75 20.6806 5.65196 21.8184 7.23832 20.9557L20.0503 13.9886C21.6499 13.1188 21.6499 10.8814 20.0503 10.0116L7.23832 3.04445ZM2.25 5.03299C2.25 2.12798 5.41674 0.346438 7.95491 1.72669L20.7669 8.6938C23.411 10.1317 23.411 13.8685 20.7669 15.3064L7.95491 22.2735C5.41674 23.6537 2.25 21.8722 2.25 18.9672L2.25 5.03299Z" fill="#ffffffff"></path>
                        </svg>
                        : <svg onClick={pauseVoice} className="plpu" viewBox="-2 -3 30 30" fill="none" >
                            <path d="M5.948 1.25H6.052C6.95048 1.24997 7.6997 1.24995 8.29448 1.32991C8.92228 1.41432 9.48908 1.59999 9.94455 2.05546C10.4 2.51093 10.5857 3.07773 10.6701 3.70552C10.7501 4.30031 10.75 5.04953 10.75 5.94801V18.052C10.75 18.9505 10.7501 19.6997 10.6701 20.2945C10.5857 20.9223 10.4 21.4891 9.94455 21.9445C9.48908 22.4 8.92228 22.5857 8.29448 22.6701C7.6997 22.7501 6.95048 22.75 6.052 22.75H5.94801C5.04953 22.75 4.30031 22.7501 3.70552 22.6701C3.07773 22.5857 2.51093 22.4 2.05546 21.9445C1.59999 21.4891 1.41432 20.9223 1.32991 20.2945C1.24995 19.6997 1.24997 18.9505 1.25 18.052V5.948C1.24997 5.04952 1.24995 4.3003 1.32991 3.70552C1.41432 3.07773 1.59999 2.51093 2.05546 2.05546C2.51093 1.59999 3.07773 1.41432 3.70552 1.32991C4.3003 1.24995 5.04952 1.24997 5.948 1.25ZM3.90539 2.81654C3.44393 2.87858 3.24644 2.9858 3.11612 3.11612C2.9858 3.24644 2.87858 3.44393 2.81654 3.90539C2.7516 4.38843 2.75 5.03599 2.75 6V18C2.75 18.964 2.7516 19.6116 2.81654 20.0946C2.87858 20.5561 2.9858 20.7536 3.11612 20.8839C3.24644 21.0142 3.44393 21.1214 3.90539 21.1835C4.38843 21.2484 5.03599 21.25 6 21.25C6.96401 21.25 7.61157 21.2484 8.09461 21.1835C8.55607 21.1214 8.75357 21.0142 8.88389 20.8839C9.0142 20.7536 9.12143 20.5561 9.18347 20.0946C9.24841 19.6116 9.25 18.964 9.25 18V6C9.25 5.03599 9.24841 4.38843 9.18347 3.90539C9.12143 3.44393 9.0142 3.24644 8.88389 3.11612C8.75357 2.9858 8.55607 2.87858 8.09461 2.81654C7.61157 2.7516 6.96401 2.75 6 2.75C5.03599 2.75 4.38843 2.7516 3.90539 2.81654ZM17.948 1.25H18.052C18.9505 1.24997 19.6997 1.24995 20.2945 1.32991C20.9223 1.41432 21.4891 1.59999 21.9445 2.05546C22.4 2.51093 22.5857 3.07773 22.6701 3.70552C22.7501 4.30031 22.75 5.04953 22.75 5.94801V18.052C22.75 18.9505 22.7501 19.6997 22.6701 20.2945C22.5857 20.9223 22.4 21.4891 21.9445 21.9445C21.4891 22.4 20.9223 22.5857 20.2945 22.6701C19.6997 22.7501 18.9505 22.75 18.052 22.75H17.948C17.0495 22.75 16.3003 22.7501 15.7055 22.6701C15.0777 22.5857 14.5109 22.4 14.0555 21.9445C13.6 21.4891 13.4143 20.9223 13.3299 20.2945C13.2499 19.6997 13.25 18.9505 13.25 18.052V5.94801C13.25 5.04953 13.2499 4.30031 13.3299 3.70552C13.4143 3.07773 13.6 2.51093 14.0555 2.05546C14.5109 1.59999 15.0777 1.41432 15.7055 1.32991C16.3003 1.24995 17.0495 1.24997 17.948 1.25ZM15.9054 2.81654C15.4439 2.87858 15.2464 2.9858 15.1161 3.11612C14.9858 3.24644 14.8786 3.44393 14.8165 3.90539C14.7516 4.38843 14.75 5.03599 14.75 6V18C14.75 18.964 14.7516 19.6116 14.8165 20.0946C14.8786 20.5561 14.9858 20.7536 15.1161 20.8839C15.2464 21.0142 15.4439 21.1214 15.9054 21.1835C16.3884 21.2484 17.036 21.25 18 21.25C18.964 21.25 19.6116 21.2484 20.0946 21.1835C20.5561 21.1214 20.7536 21.0142 20.8839 20.8839C21.0142 20.7536 21.1214 20.5561 21.1835 20.0946C21.2484 19.6116 21.25 18.964 21.25 18V6C21.25 5.03599 21.2484 4.38843 21.1835 3.90539C21.1214 3.44393 21.0142 3.24644 20.8839 3.11612C20.7536 2.9858 20.5561 2.87858 20.0946 2.81654C19.6116 2.7516 18.964 2.75 18 2.75C17.036 2.75 16.3884 2.7516 15.9054 2.81654Z" fill="#ffffffff"></path>
                        </svg>
                    }
                    {value.voicePreview && <audio ref={audioRef} src={value.voicePreview} />}
                    <canvas
                        ref={canvasRef}
                        width={150}
                        height={30}
                        className="bardiv"
                    />
                </div>
            )}
        </div>
    );
}
