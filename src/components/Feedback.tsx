import React from "react";

function Feedback() {
    return (
        <div>
            <h1>Feedback</h1>
            <title>Feedback</title>
            <h3>Jestli jsi našel/la nějaký bugy či co, tak mi napiš:</h3>

            <a
                className="insta"
                target="_blank"
                href="https://www.instagram.com/lukas.ode/"
            >
                <button>
                    <img
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt="Instagram"
                    />
                </button>
            </a>
        </div>
    );
}

export default Feedback;
