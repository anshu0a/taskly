import { useEffect, useRef } from 'react';
import '../../cssFile/Challenges-css/AllFeed.css';
import OneChallenge from './OneChallenge';

export default function AllFeed({setData, dares, myFeed}) {
    const videoRefs = useRef([]);
    const playingRef = useRef(null);
    const timerRef = useRef(null);
    const scrollStopTimer = useRef(null);

    useEffect(() => {

        const scroller = document.querySelector(".mainBody");

        function isInView(card) {
            const rect = card.getBoundingClientRect();
            const vh = window.innerHeight;
            return rect.top < vh * 0.75 && rect.bottom > vh * 0.25;
        }

        function getVisibleVideos() {
            return videoRefs.current.filter(v => v && isInView(v));
        }

        function stopCurrentVideo() {
            if (playingRef.current) {
                const vid = playingRef.current.querySelector("video");
                vid.pause();
                playingRef.current = null;
            }
            clearTimeout(timerRef.current);
        }

        function playVideo(card) {
            stopCurrentVideo();
            if (!card) return;

            const vid = card.querySelector("video");
            vid.currentTime = 0;
            vid.play();

            playingRef.current = card;

            timerRef.current = setTimeout(() => {
                vid.pause();
                playNext();
            }, 5000);
        }

        function playNext() {
            const visible = getVisibleVideos();
            if (visible.length === 0) return;

            let i = visible.indexOf(playingRef.current);
            if (i === -1 || i === visible.length - 1) i = 0;
            else i++;

            playVideo(visible[i]);
        }

        function onScroll() {
            stopCurrentVideo();  // stop immediately while scrolling

            clearTimeout(scrollStopTimer.current);
            scrollStopTimer.current = setTimeout(() => {
                const visible = getVisibleVideos();
                if (visible.length > 0) playVideo(visible[0]);
            }, 180);  // wait until scrolling stops
        }

        scroller.addEventListener("scroll", onScroll);

        // Initial play
        setTimeout(() => {
            const visible = getVisibleVideos();
            if (visible.length > 0) playVideo(visible[0]);
        }, 300);

        // hover effect
        const handleHover = (video) => {
            playVideo(video);
        };


        videoRefs.current.forEach((video, index) => {
            if (video) {
                video.addEventListener("mouseenter", () => handleHover(video));
            }
        });

        return () => {
            scroller.removeEventListener("scroll", onScroll);
            stopCurrentVideo();
            videoRefs.current.forEach((video, index) => {
                if (video) {
                    video.removeEventListener("mouseenter", () => handleHover(video));
                }
            });
        };

    }, []);



    return (
        <div className="allfeedd isFlex">
            {dares.map((oneDare, i) => (
                <OneChallenge myFeed={myFeed} oneDare={oneDare} key={i} ref={el => videoRefs.current[i] = el} />
            ))}
        </div>
    );
}
