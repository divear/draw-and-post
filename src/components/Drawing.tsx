import React, { useRef, useState } from "react";
let gcanvas;

function Drawing() {
    let Xpos: number;
    let Ypos: number;
    let isDown = false;
    const [lineWidth, setLineWidth] = useState(50);
    const [color, setColor] = useState("black");

    // const HEIGHT = window.innerWidth > 820 ? window.innerHeight - 100 : 200;
    const WIDTH = window.innerWidth > 820 ? window.innerWidth / 2 : 375;

    onmousedown = function (e) {
        console.log("mouse down");

        isDown = true;
        this.onmousemove = (e) => {
            console.log("mouse move");

            if (isDown || WIDTH < 810) {
                Xpos = e.offsetX;
                Ypos = e.offsetY;
                console.log(Xpos);
            }

            this.onmouseup = () => {
                isDown = false;
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
                width={WIDTH}
                height={WIDTH}
            />
        </div>
    );
}

export default Drawing;

export { gcanvas };
