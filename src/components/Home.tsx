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
      <h1>home</h1>

      {data[0] ? (
        data.map((d) => {
          console.log(d);

          return (
            <div key={d.id} className="message">
              <h5 className="date">{d.posted_date}</h5>
              <h5>
                <i>{d.username || "Anonym"}</i>
              </h5>
              <h1>{d.nazev}</h1>
              <img className="img" src={d.img} alt="" />
            </div>
          );
        })
      ) : (
        <h1>Načítání...</h1>
      )}
    </div>
  );
}

export default Home;
