import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import "../styles/ReportCharts.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ReportPage({ answers }) {
	// Bereken hoeveel dark patterns getriggerd zijn
	const total = answers.length;
	const triggeredCount = answers.filter((a) => a.dark_pattern_triggered).length;

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
				<h2>Overzicht van je antwoorden en risico's</h2>
				<p>
					Deze installatie stelde vier vragen over technologieën die je privacy
					raken: gezichtsherkenning, herkenning van mensen om je heen,
					spraakanalyse en datadeling. Hieronder zie je jouw antwoorden, het
					bijbehorende risico en de beïnvloedingspatronen die werden gebruikt.
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
