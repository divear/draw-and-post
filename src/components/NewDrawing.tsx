import React from "react";

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
      </form>
    </div>
  );
}

export default NewDrawing;
