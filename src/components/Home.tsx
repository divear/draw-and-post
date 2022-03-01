import React, { useEffect, useState } from "react";

function Home() {
    const serverDomain = process.env.REACT_APP_SERVERDOMAIN;
    const [data, setData] = useState<any[]>([]);
    const [backup, setBackup] = useState([]);

    useEffect(() => {
        async function getBlogs() {
            try {
                const response = await fetch(serverDomain + "/drawings");
                const jsonData = await response.json();
                setData(jsonData);
                setBackup(jsonData.reverse());
            } catch (error) {
                console.log(error);
            }
        }
        getBlogs();
    }, []);

    return (
        <div>
            <title>Malo</title>
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
