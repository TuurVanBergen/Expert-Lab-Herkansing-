import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import "../styles/ReportCharts.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ReportPage({ answers }) {
	// Filter alleen de eerste 4 vragen (de privacy gerelateerde met dark patterns)
	const firstFour = answers.slice(0, 4);

	// Bepaal trigger: als antwoord === "Ja" → dark pattern getriggerd
	const triggeredCount = firstFour.filter(
		(a) => a.answer?.toLowerCase() === "ja"
	).length;
	const total = firstFour.length;

	const data = {
		labels: ["Dark patterns getriggerd", "Niet getriggerd"],
		datasets: [
			{
				data: [triggeredCount, total - triggeredCount],
				backgroundColor: ["#FF6384", "#36A2EB"],
				hoverBackgroundColor: ["#FF6384CC", "#36A2EBCC"],
			},
		],
	};

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
				<h2>Dark pattern overzicht</h2>
				<p>
					De eerste vier vragen bevatten subtiele beïnvloedingstechnieken (dark
					patterns). In de grafiek zie je hoe vaak je hierin bent getrapt.
				</p>

				{/* Donut chart */}
				<div className="donut-chart-container">
					<Doughnut data={data} />
					<p className="chart-description">
						Hoe vaak ben je in een dark pattern gelopen?
					</p>
				</div>
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
