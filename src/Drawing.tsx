import React, { useRef, useState } from "react";
let gcanvas;

function Drawing() {
    let Xpos: number;
    let Ypos: number;
    let isUp = false;
    const [lineWidth, setLineWidth] = useState(50);
    const [color, setColor] = useState("black");

    onmousedown = function (e) {
        isUp = true;
        this.onmousemove = (e) => {
            if (isUp) {
                Xpos = e.offsetX;
                Ypos = e.offsetY;
            }

            this.onmouseup = () => {
                isUp = false;
            };
        };
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
            />
            <canvas
                id="canvas"
                onMouseMove={Draw}
                ref={canvas}
                width={window.innerWidth / 2}
                height={window.innerHeight - 100}
            />
        </div>
    );
}

export default Drawing;

export { gcanvas };
