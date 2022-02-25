import React from "react";
import Drawing from "../Drawing";

function NewDrawing() {
    return (
        <div>
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
