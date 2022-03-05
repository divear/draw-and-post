import React, { useEffect, useState } from "react";
import Modal from "./Modal";

function Home() {
    const serverDomain = process.env.REACT_APP_SERVERDOMAIN;
    const [data, setData] = useState<any[]>([]);
    const [modalVis, setModalVis] = useState(false);

    useEffect(() => {
        async function getBlogs() {
            try {
                const response = await fetch(serverDomain + "/drawings");
                const jsonData = await response.json();
                setData(jsonData.reverse());
            } catch (error) {
                console.log(error);
            }
        }
        getBlogs();
    }, []);

    return (
        <div>
            <title>Malo</title>

            <div className={modalVis ? "" : "no"}>
                <Modal />
            </div>

            <div className="profileMin">
                <h1
                    onClick={() => setModalVis(true)}
                    className={localStorage.getItem("username") ? "" : "no"}
                >
                    <img
                        className="pfp"
                        src="https://avatars.githubusercontent.com/u/77848587?v=4"
                        alt="Icon"
                    />
                    {localStorage.getItem("username")}
                </h1>
                <button
                    className={localStorage.getItem("username") ? "no" : ""}
                    onClick={() => setModalVis(true)}
                >
                    Přihlásit se
                </button>
            </div>
            <button
                onClick={() => (window.location.href = "/novyObrazek")}
                className="addDrawing"
            >
                Namalovat nový
            </button>
            <br />
            <div className="messages">
                {data[0] ? (
                    data.map((d) => {
                        return (
                            <div key={d.id} className="message">
                                <h5>
                                    <i>{d.username || "Anonym"}</i>
                                </h5>
                                <h1>{d.nazev}</h1>
                                <img className="img" src={d.img} alt="" />
                                <h5 className="date">{d.posted_date}</h5>
                            </div>
                        );
                    })
                ) : (
                    <h1>Načítání...</h1>
                )}
            </div>
            <div className="footer">
                Lukáš Odehnal 2022
                <a className="floatRight" href="/feedback">
                    Feedback
                </a>
            </div>
        </div>
    );
}

export default Home;
