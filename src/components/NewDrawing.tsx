import React, { useState } from "react";
import Drawing from "./Drawing";
import { ref, getStorage, uploadBytes } from "./firebase";
import { gcanvas as canvas } from "./Drawing";

const storage = getStorage();
const name = (Math.random() + 1).toString(36).substring(7);

function NewDrawing() {
    const serverDomain = process.env.REACT_APP_SERVERDOMAIN;
    const [isDisabled, setIsDisabled] = useState(false);
    const [nazev, setNazev] = useState("");
    const [username, setUsername] = useState("");

    const imgLink = `https://firebasestorage.googleapis.com/v0/b/drawing-41fad.appspot.com/o/images%2F${name}.png?alt=media`;

    function submit(e) {
        e.preventDefault();

        username && localStorage.setItem("username", username);

        async function uploadCanvas() {
            let imgBlob: any;
            canvas.toBlob((blob) => {
                imgBlob = blob;

                const spaceRef = ref(storage, `images/${name}.png`);

                imgBlob &&
                    uploadBytes(spaceRef, imgBlob).then(async (snapshot) => {
                        try {
                            console.log("Uploaded!!");
                            console.log(snapshot);

                            setIsDisabled(true);

                            const Rnazev = { nazev };
                            const Rlink = { imgLink };
                            const Rusername = { username };

                            const arr = [Rnazev, Rlink, Rusername];

                            const response = await fetch(
                                `${serverDomain}/drawings`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(arr),
                                }
                            );
                            console.log(response);
                            window.location.href = "/";
                        } catch (error) {
                            console.log(error);
                        }
                    });
            });
        }
        uploadCanvas();
    }

    return (
        <div className="newDrawing">
            <title>Nový obrázek</title>
            <form onSubmit={submit} className="addForm" action="">
                <div className="usernameDiv">
                    <label htmlFor="username">Přezdívka</label>
                    <br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        className="newchalkaInput"
                    />
                </div>

                <div className="usernameDiv">
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
            </form>
        </div>
    );
}

export default NewDrawing;
