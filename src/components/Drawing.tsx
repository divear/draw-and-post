import React, { useRef, useState } from "react";
let gcanvas;

function Drawing() {
    let Xpos: number;
    let Ypos: number;
    let isDown = false;
    const [lineWidth, setLineWidth] = useState(50);
    const [color, setColor] = useState("black");

    const HEIGHT = window.innerWidth;
    const WIDTH = window.innerWidth;

    onmousedown = function (e) {
        isDown = true;
        this.onmousemove = (e) => {
            if (isDown) {
                Xpos = e.offsetX;
                Ypos = e.offsetY;
            }

            this.onmouseup = () => {
                isDown = false;
            };
        };
    };
    ontouchmove = function (e) {
        console.log(WIDTH);

        Xpos = e.touches[0].clientX;
        Ypos = e.touches[0].clientY - HEIGHT;
    };

    const canvas = useRef(null);

    function Draw() {
        const c = canvas.current && canvas.current.getContext("2d");
        gcanvas = canvas.current;

        if (c) {
            c.fillStyle = color;
            c.beginPath();
            c.arc(Xpos, Ypos, lineWidth, 0, 2 * Math.PI);
            c.fill();
        }
    }
    return (
        <div className="drawing">
            <input
                onChange={(e) => setLineWidth(+e.target.value)}
                value={lineWidth}
                type="range"
                className="floatRight"
                min={1}
                max={100}
                title="Tloušťka tahu"
            />
            <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                title="Barva tahu"
                className="colorInput"
            />
            <canvas
                id="canvas"
                onMouseMove={Draw}
                onTouchMove={Draw}
                ref={canvas}
                width={WIDTH}
                height={HEIGHT}
            />
        </div>
    );
}

export default Drawing;

export { gcanvas };
