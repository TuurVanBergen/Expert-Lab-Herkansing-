import React from "react";
import "./ReportCharts.css";

export default function ReportPage({ answers }) {
	return (
		<div className="report-container">
			<h1 className="report-title">Jouw Privacy Verhaal</h1>
			<p className="report-intro">
				Deze installatie laat zien hoeveel er over jou te weten valt door
				simpele vragen te stellen. Het doel? Jou laten nadenken over welke
				informatie je deelt, wat daaruit te halen is, en welke risico’s dat kan
				hebben. Tijdens deze ervaring hebben we jouw antwoorden verzameld en een
				beeld gemaakt van je digitale kwetsbaarheid.
			</p>
			<section className="report-section">
				<h2>Overzicht van je antwoorden en risico's</h2>
				<p>
					Deze installatie stelde vier vragen over technologieën die je privacy
					raken: gezichtsherkenning, herkenning van mensen om je heen,
					spraakanalyse en datadeling. Hieronder zie je jouw antwoorden, het
					bijbehorende risico en de beïnvloedingspatronen die werden gebruikt.
				</p>
			</section>
			<section className="report-section">
				<h2>Jouw persoonlijke profiel</h2>
				<p>
					We stelden je vragen over je persoonlijkheid, sociale gedrag en
					privacybewustzijn. Dit geeft inzicht in jouw voorkeuren, gevoelens en
					hoe je omgaat met technologie en sociale druk. Hieronder zie je een
					samenvatting van je antwoorden en wat dit over jou zegt.
				</p>
			</section>
			<section className="report-section">
				<h2>Conclusies</h2>
				<ul>
					{answers.map((a, i) => (
						<li key={i}>
							<strong>{a.category}:</strong> {a.insight} ({a.risk_level})
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}
