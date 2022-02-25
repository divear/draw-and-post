import React, { useEffect, useRef, useState } from "react";

function Drawing() {
    let Xpos: number;
    let Ypos: number;
    let isUp = false;
    let lineWidth = 50;

    onmousedown = function (e) {
        isUp = true;
        this.onmousemove = (e) => {
            if (isUp) {
                console.log(e);
                Xpos = e.offsetX;
                Ypos = e.offsetY;
            }

            this.onmouseup = () => {
                isUp = false;
            };
        };
        console.log(Xpos);
    };

    const canvas = useRef(null);

    useEffect(() => {
        if (canvas) {
            const c: CanvasRenderingContext2D | null =
                canvas.current && canvas.current.getContext("2d");

            c.fillStyle = "purple";
        }
    }, [canvas]);

    function Draw() {
        const c = canvas.current && canvas.current.getContext("2d");

        if (c) {
            c.fillStyle = "green";
            // c.fillRect(
            //     Xpos - lineWidth / 2,
            //     Ypos - lineWidth / 2,
            //     lineWidth,
            //     lineWidth
            // );
            c.beginPath();
            c.arc(
                Xpos - lineWidth / 2,
                Ypos - lineWidth / 2,
                lineWidth,
                0,
                2 * Math.PI
            );
            c.fill();
        }
    }
    return (
        <div className="drawing">
            <canvas
                id="canvas"
                onMouseMove={Draw}
                ref={canvas}
                width={window.innerWidth / 2}
                height={window.innerHeight - 50}
            />
        </div>
    );
}

export default Drawing;
