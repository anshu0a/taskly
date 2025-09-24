import { useRef, useEffect } from "react";
import '../../cssFile/Login-css/MainLogin.css'


import Inputs from './Inputs'
import Optionlogin from './OptionLogin'


export default function MainLogin() {
    const canvasRef = useRef(null);
    let stars = [];
    let numStars;
    let animationId;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createStars() {
            numStars = Math.floor(canvas.width * canvas.height * 0.0001);
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2,
                    dx: (Math.random() - 0.5) * 0.5,
                    dy: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random(),
                    opacityChange: Math.random() * 0.02 + 0.005,
                });
            }
        }

        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();

                star.x += star.dx;
                star.y += star.dy;

                if (star.x < 0) star.x = canvas.width;
                if (star.x > canvas.width) star.x = 0;
                if (star.y < 0) star.y = canvas.height;
                if (star.y > canvas.height) star.y = 0;

                star.opacity += star.opacityChange;
                if (star.opacity <= 0 || star.opacity >= 1) {
                    star.opacityChange *= -1;
                }
            });
        }

        function animate() {
            drawStars();
            animationId = requestAnimationFrame(animate);
        }

        // Init
        resizeCanvas();
        createStars();
        animate();

        // Resize handler
        window.addEventListener("resize", () => {
            resizeCanvas();
            createStars();
        });

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} className="stardiv"></canvas>
            <div className="mainloginprt isFlex">
                <img src="./Svg/textLogo.svg"></img>
                <Inputs />
                <div className="orline">OR</div>
                <Optionlogin />
            </div>
            
        </>
    );
}
