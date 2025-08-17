// EndPage.jsx
import React from "react";
import "../styles/EndPage.css";

export default function EndPage({ onPrint }) {
	return (
		<div className="endpage no-print">
			<div className="endpage__box">
				<h1 className="endpage__title">Bedankt voor je deelname</h1>

				<p className="endpage__printer">
					Kijk nu naar de printer — jouw gepersonaliseerde print komt eraan.
				</p>

				<p className="endpage__lead">
					Je dacht een visual te personaliseren. In werkelijkheid heb je zojuist
					persoonlijke informatie gedeeld.
				</p>

				<p className="endpage__hint">
					<em>
						Deze installatie draait om bewustwording: met een paar simpele
						vragen kunnen we al een verrassend volledig beeld van je vormen.
						Denk na voordat je deelt.
					</em>
				</p>
				{/* Printknop */}
				<button className="endpage__print-btn" onClick={onPrint}>
					klik voor een verrassing
				</button>
			</div>
		</div>
	);
}
