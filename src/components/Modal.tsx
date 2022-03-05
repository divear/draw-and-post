import React, { useRef, useState } from "react";
import pfp from "./imgs/defaultPfp.png";

function Modal() {
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [imgLink, setImgLink] = useState("");
    const inputFile = useRef(null);
    const clickEvent = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: false,
    });

    function chooseImg() {
        inputFile.current.dispatchEvent(clickEvent);
    }

    function submit(e) {
        console.log("submit");
    }
    function changeImg(e) {
        setImgLink(
            `https://firebasestorage.googleapis.com/v0/b/drawing-41fad.appspot.com/o/pfp%2F${e.files[0].name}?alt=media`
        );
    }

    return (
        <div className="modal">
            <div className="modalCard">
                <h4 onClick={() => window.location.reload()} className="exit">
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
                    src={pfp}
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
