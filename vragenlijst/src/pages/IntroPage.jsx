import "../styles/IntroPage.css";
import React, { useEffect, useRef } from "react";

function IntroPage({ onStart, digitalBtnPressed }) {
	// Ref om bij te houden of de start al is geactiveerd

	const startedRef = useRef(false);

	// useEffect luistert naar veranderingen in digitalBtnPressed of onStart
	useEffect(() => {
		// Als de start al is geactiveerd, niets doen
		if (startedRef.current) return;

		// Als er geen knop is ingedrukt, niets doen
		if (!digitalBtnPressed) return;

		// Zet de knop input om naar een kleine string voor vergelijking
		const v = String(digitalBtnPressed).trim().toLowerCase();

		// Check of de input overeenkomt met één van de starttriggers
		const isStart =
			v === "ja" ||
			v === "nee" ||
			v === "yes" ||
			v === "no" ||
			v === "yes_btn" ||
			v === "no_btn";

		if (isStart) {
			startedRef.current = true;
			onStart(); // roep de start-functie aan
		}
	}, [digitalBtnPressed, onStart]);

	return (
		<div className="intro-page">
			<div className="intro-box">
				<h1>Welkom!</h1>
				<p>
					Beantwoord een paar korte vragen en creëer je eigen unieke visual.
					<br />
					Op basis van jouw antwoorden maken we een persoonlijke, visuele
					ervaring die helemaal bij jou past.
				</p>
				<button
					className="start-btn"
					onClick={() => {
						if (!startedRef.current) {
							startedRef.current = true;
							onStart();
						}
					}}
				>
					Start installatie
				</button>
			</div>
		</div>
	);
}

export default IntroPage;
