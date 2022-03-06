import { ref, getStorage, uploadBytes } from "./firebase";
import React, { useRef, useState } from "react";

function Modal() {
    const [username, setUsername] = useState(localStorage.getItem("username"));
    const [img, setImg] = useState<any>(null);
    const [imgLink, setImgLink] = useState(
        localStorage.getItem("pfp") ||
            "https://firebasestorage.googleapis.com/v0/b/drawing-41fad.appspot.com/o/pfp%2Ftrolge_pfp.png?alt=media"
    );
    const inputFile = useRef(null);
    const [isMouseOnCard, setMouseIsOnCard] = useState(false);
    const clickEvent = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: false,
    });
    let modalCardCoords;

    const storage = getStorage();

    function chooseImg() {
        inputFile.current.dispatchEvent(clickEvent);
    }
    function changeImg(e) {
        const tempImg = e.target.files[0];
        setImg(tempImg);
        localStorage.setItem(
            "pfp",
            `https://firebasestorage.googleapis.com/v0/b/drawing-41fad.appspot.com/o/pfp%2F${tempImg.name}?alt=media`
        );

        const spaceRef = ref(storage, `pfp/${tempImg && tempImg.name}`);
        uploadBytes(spaceRef, tempImg).then(async (snapshot) => {
            window.location.reload();
        });
    }
    function exit() {
        if (isMouseOnCard || !img) return;
        localStorage.setItem("username", username);
        window.location.reload();
    }

    return (
        <div onClick={exit} className="modal">
            <div
                onMouseEnter={() => setMouseIsOnCard(true)}
                onMouseLeave={() => setMouseIsOnCard(false)}
                ref={(n) => (modalCardCoords = n)}
                className="modalCard"
            >
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

                {/* source image */}
                <img
                    onClick={() => chooseImg()}
                    id="choosePfp"
                    className="choosePfp"
                    src={imgLink}
                    alt="Vyber obrázek"
                />

                {/* invisible input */}
                <input
                    className="no"
                    accept="image/png, image/jpg, image/jpeg"
                    ref={inputFile}
                    type="file"
                    onChange={(e) => changeImg(e)}
                />
            </div>
        </div>
    );
}

export default Modal;
