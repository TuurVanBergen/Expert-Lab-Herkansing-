import "../styles/IntroPage.css";
import React from "react";
function IntroPage({ onStart }) {
	return (
		<div className="intro-page">
			<div className="intro-box">
				<h1>Welkom bij de interactieve installatie</h1>
				<p>
					Deze ervaring maakt gebruik van innovatieve technologie om je een
					unieke audiovisuele beleving te bieden.
					<br />
					Voor de beste werking vragen we je enkele eenvoudige vragen.
				</p>
				<button className="start-btn" onClick={onStart}>
					Start installatie
				</button>
			</div>
		</div>
	);
}

export default IntroPage;
