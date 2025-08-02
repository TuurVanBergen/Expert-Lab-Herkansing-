import "../styles/EndPage.css";
import React, { useEffect, useState } from "react";

function EndPage() {
	const [fadeToBlack, setFadeToBlack] = useState(false);
	const [countdown, setCountdown] = useState(10);

	useEffect(() => {
		const interval = setInterval(() => {
			setCountdown((prev) => prev - 1);
		}, 1000);

		const timer = setTimeout(() => {
			setFadeToBlack(true);
			clearInterval(interval);
		}, 5000);

		return () => {
			clearTimeout(timer);
			clearInterval(interval);
		};
	}, []);

	return (
		<div className={`end-page ${fadeToBlack ? "blackout" : ""}`}>
			<div className="end-box">
				<h2>Bedankt voor het invullen!</h2>
				<p>
					Je antwoorden zijn opgeslagen en de installatie is klaar om te
					starten.
				</p>
				<p>Installatie start over {countdown} seconden...</p>
			</div>
		</div>
	);
}

export default EndPage;
