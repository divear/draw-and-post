import React, { useState } from "react";
import Drawing from "../Drawing";
import { ref, getStorage, uploadBytes } from "./firebase";
import { gcanvas as canvas } from "../Drawing";

const storage = getStorage();
function NewDrawing() {
    const serverDomain = process.env.REACT_APP_SERVERDOMAIN;
    const [isDisabled, setIsDisabled] = useState(false);
    const [nazev, setNazev] = useState("f");
    const [img, setImg] = useState<any>();
    const [imgLink, setImgLink] = useState("");
    const [username, setUsername] = useState("f");
    const [error, setError] = useState("");

    function submit(e) {
        e.preventDefault();
        if (!nazev || !username) {
            setError("Všechna pole jsou povinná!");
            return;
        }

        localStorage.setItem("username", username);

        console.log(canvas);

        canvas.toBlob((blob) => {
            console.log(blob);
            var image = new Image();
            image.src = blob;
        });
        const name = (Math.random() + 1).toString(36).substring(7);
        const spaceRef = ref(storage, `images/${name}`);

        setImg(img);
        setImgLink(
            `https://firebasestorage.googleapis.com/v0/b/drawing-41fad.appspot.com/o/images%2F${name}?alt=media&token=${process.env.REACT_APP_TOKEN}`
        );
        console.log(name);

        uploadBytes(spaceRef, img).then(async (snapshot) => {
            try {
                setIsDisabled(true);

                const Rnazev = { nazev };
                const Rlink = { imgLink };
                const Rusername = { username };

                const arr = [Rnazev, Rlink, Rusername];

                const response = await fetch(`${serverDomain}drawings`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(arr),
                });
                console.log(response);
                // window.location.href = "/";
            } catch (error) {
                console.log(error);
            }
        });
    }

    return (
        <div>
            <form onSubmit={submit} className="addForm" action="">
                <div className="usernameDiv">
                    <label htmlFor="username">Přezdívka</label>
                    <br />
                    <input
                        className="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                    />
                </div>

                <div className="bodyDiv">
                    <label htmlFor="nazev">Název obrázku</label>
                    <br />
                    <input
                        onChange={(e) => setNazev(e.target.value)}
                        value={nazev}
                        className="newchalkaInput"
                        type="text"
                        id="nazev"
                    />
                </div>
                <Drawing />
                <button className="poslat" disabled={isDisabled}>
                    Poslat
                </button>

                <h2 className="error">{error}</h2>
            </form>
        </div>
    );
}

export default NewDrawing;
