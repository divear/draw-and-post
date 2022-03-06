import React, { useRef, useState } from "react";
import pfp from "./imgs/defaultPfp.png";

function Modal() {
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [img, setImg] = useState(pfp);
    const inputFile = useRef(null);
    const clickEvent = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: false,
    });

    function chooseImg() {
        inputFile.current.dispatchEvent(clickEvent);
    }
    function changeImg(e) {
        if (e.target.files && e.target.files[0]) {
            setImg(URL.createObjectURL(e.target.files[0]));
            localStorage.setItem("pfp", img);
        }
    }
    function exit() {}

    return (
        <div className="modal">
            <div className="modalCard">
                <h4 onClick={exit} className="exit">
                    X
                </h4>
                <label className="label" htmlFor="username">
                    Přezdívka
                </label>
                <br />
                <input
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        localStorage.setItem("username", e.target.value);
                    }}
                    id="username"
                    className="username"
                    type="text"
                />
                <br />
                <label className="label" htmlFor="choosePfp">
                    Profilovka
                </label>
                <br />

                <img
                    onClick={() => chooseImg()}
                    id="choosePfp"
                    className="choosePfp"
                    src={img}
                    alt=""
                />

                <input
                    className="no"
                    accept="image/*"
                    ref={inputFile}
                    type="file"
                    onChange={(e) => changeImg(e)}
                />
            </div>
        </div>
    );
}

export default Modal;
