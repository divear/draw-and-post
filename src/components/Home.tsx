import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import defaultPfp from "./imgs/defaultPfp.png";

function Home() {
	const isPhone = window.innerWidth < 840;
	const pfp = localStorage.getItem("pfp") || defaultPfp;
	const modalRef = useRef();

	const serverDomain = process.env.REACT_APP_SERVERDOMAIN;
	const [data, setData] = useState<any[]>([]);
	const [modalVis, setModalVis] = useState(false);
	const [modalPic, setModalPic] = useState("");

	useEffect(() => {
		async function getBlogs() {
			try {
				const response = await fetch(serverDomain + "/drawings");

				const jsonData = await response.json();
				setData(jsonData.reverse());
				console.log(jsonData);
			} catch (error) {
				console.log(error);
			}
		}
		getBlogs();
	}, []);

	onkeydown = (e) => {
		if (e.key === "Escape") {
			setModalVis(false);
		}
	};

	return (
		<div>
			<title>Malo</title>

			<div ref={modalRef} className={modalVis ? "" : "no"}>
				<Modal />
			</div>

			<div className="profileMin">
				<h1
					onClick={() => setModalVis(true)}
					className={
						localStorage.getItem("username") ||
						localStorage.getItem("pfp")
							? ""
							: "no"
					}
				>
					{localStorage.getItem("username")}
					<img className="pfp" src={pfp} alt="Icon" />
				</h1>
				<button
					className={
						localStorage.getItem("username") ||
						localStorage.getItem("pfp")
							? "no"
							: ""
					}
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
			<div
				onClick={() => setModalPic(null)}
				className={modalPic && !isPhone ? "modalPicParent" : "no"}
			>
				<img className="modalPic" src={modalPic} alt="" />
			</div>
			<div className="messages">
				{data[0] ? (
					data.map((d) => {
						return (
							<div
								onClick={() => setModalPic(d.img)}
								key={d.id}
								className="message"
							>
								<h5>
									<img
										className="smallPfp"
										src={d.pfp}
										alt="👤"
									/>
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
