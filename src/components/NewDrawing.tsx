import React from "react";
import Drawing from "../Drawing";

function NewDrawing() {
    return (
        <div>
            <h1>Novej obrázek</h1>

            <form className="addForm" action="">
                <div className="usernameDiv">
                    <label htmlFor="username">Přezdívka</label>
                    <br />
                    <input type="text" id="username" />
                </div>

                <div className="bodyDiv">
                    <label htmlFor="nazev">Název obrázku</label>
                    <br />
                    <input type="text" id="nazev" />
                </div>
                <Drawing />
                <button>Poslat</button>
            </form>
        </div>
    );
}

export default NewDrawing;
