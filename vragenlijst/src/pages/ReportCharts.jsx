import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
} from "chart.js";

import "../styles/ReportCharts.css";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement
);

export default function ReportPage({ answers }) {
	// Eerste 4 vragen: privacy / dark patterns
	const firstFour = answers.slice(0, 4);
	const triggeredCount = firstFour.filter(
		(a) => a.answer?.toLowerCase() === "ja"
	).length;
	const total = firstFour.length;

	const donutData = {
		labels: ["Dark patterns getriggerd", "Niet getriggerd"],
		datasets: [
			{
				data: [triggeredCount, total - triggeredCount],
				backgroundColor: ["#FF6384", "#36A2EB"],
				hoverBackgroundColor: ["#FF6384CC", "#36A2EBCC"],
			},
		],
	};

	const privacyQuestions = firstFour;
	const counts = { low: 0, medium: 0, high: 0, notAccepted: 0 };

	privacyQuestions.forEach((q) => {
		if (q.answer?.toLowerCase() === "ja") {
			if (q.risk_level === "low") counts.low++;
			if (q.risk_level === "medium") counts.medium++;
			if (q.risk_level === "high") counts.high++;
		} else {
			counts.notAccepted++;
		}
	});

	const barData = {
		labels: ["Privacygevoelige keuzes"],
		datasets: [
			{
				label: "Geaccepteerd (Laag risico)",
				data: [counts.low],
				backgroundColor: "#4CAF50",
			},
			{
				label: "Geaccepteerd (Middel risico)",
				data: [counts.medium],
				backgroundColor: "#FFC107",
			},
			{
				label: "Geaccepteerd (Hoog risico)",
				data: [counts.high],
				backgroundColor: "#F44336",
			},
			{
				label: "Niet geaccepteerd",
				data: [counts.notAccepted],
				backgroundColor: "#9E9E9E",
			},
		],
	};

	const barOptions = {
		responsive: true,
		plugins: {
			legend: { position: "bottom" },
		},
		scales: {
			x: { stacked: true },
			y: { stacked: true, beginAtZero: true, stepSize: 1 },
		},
	};

	// Persoonlijke vragen (vanaf index 4)
	const personalQuestions = answers.slice(4);

	// Eerste persoonlijke chart: ja/nee per vraag met kleurcode risico
	const personalLabels = personalQuestions.map((q) => q.category);
	const personalData = personalQuestions.map((q) =>
		q.answer?.toLowerCase() === "ja" ? 1 : 0
	);
	const personalColors = personalQuestions.map((q) => {
		if (q.answer?.toLowerCase() !== "ja") return "#9E9E9E";
		if (q.risk_level === "low") return "#4CAF50";
		if (q.risk_level === "medium") return "#FFC107";
		if (q.risk_level === "high") return "#F44336";
		return "#9E9E9E";
	});

	const personalPerQuestionData = {
		labels: personalLabels,
		datasets: [
			{
				label: "Keuze",
				data: personalData,
				backgroundColor: personalColors,
			},
		],
	};

	const personalPerQuestionOptions = {
		indexAxis: "y",
		responsive: true,
		scales: {
			x: {
				beginAtZero: true,
				max: 1,
				ticks: {
					callback: (value) => (value === 1 ? "Ja" : "Nee"),
				},
			},
		},
		plugins: {
			legend: { display: false },
		},
	};

	// Tweede persoonlijke chart: risico overzicht
	const personalRiskCounts = { low: 0, medium: 0, high: 0, noAnswer: 0 };
	personalQuestions.forEach((q) => {
		if (q.answer?.toLowerCase() === "ja") {
			if (q.risk_level === "low") personalRiskCounts.low++;
			if (q.risk_level === "medium") personalRiskCounts.medium++;
			if (q.risk_level === "high") personalRiskCounts.high++;
		} else {
			personalRiskCounts.noAnswer++;
		}
	});

	const personalRiskData = {
		labels: ["Persoonlijke keuzes"],
		datasets: [
			{
				label: "Geaccepteerd (Laag risico)",
				data: [personalRiskCounts.low],
				backgroundColor: "#4CAF50",
			},
			{
				label: "Geaccepteerd (Middel risico)",
				data: [personalRiskCounts.medium],
				backgroundColor: "#FFC107",
			},
			{
				label: "Geaccepteerd (Hoog risico)",
				data: [personalRiskCounts.high],
				backgroundColor: "#F44336",
			},
			{
				label: "Niet geaccepteerd",
				data: [personalRiskCounts.noAnswer],
				backgroundColor: "#9E9E9E",
			},
		],
	};

	return (
		<div className="report-container">
			<h1 className="report-title">Jouw Privacy Verhaal</h1>
			<p className="report-intro">
				Deze installatie laat zien hoeveel er over jou te weten valt door
				simpele vragen te stellen. Het doel? Jou laten nadenken over welke
				informatie je deelt, nh ,wat daaruit te halen is, en welke risico’s dat
				kan hebben. Tijdens deze ervaring hebben we jouw antwoorden verzameld en
				een beeld gemaakt van je digitale kwetsbaarheid.
			</p>

			<section className="report-section">
				<h2>Overzicht van je antwoorden en risico's</h2>
				<p>
					Deze installatie stelde vier vragen over technologieën die je privacy
					raken: gezichtsherkenning, herkenning van mensen om je heen,
					spraakanalyse en datadeling. Hieronder zie je jouw antwoorden, het
					bijbehorende risico en de beïnvloedingspatronen die werden gebruikt.
				</p>

				<h2>Dark pattern overzicht</h2>
				<div className="donut-chart-container">
					<Doughnut data={donutData} />
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
				<div className="bar-chart-container">
					<Bar data={barData} options={barOptions} />
				</div>
			</section>

			<section className="report-section">
				<h2>Persoonlijke vragen overzicht</h2>
				<div className="bar-chart-container">
					<Bar
						data={personalPerQuestionData}
						options={personalPerQuestionOptions}
					/>
				</div>
			</section>

			<section className="report-section">
				<h2>Persoonlijke keuzes en risico</h2>
				<div className="bar-chart-container">
					<Bar data={personalRiskData} options={barOptions} />
				</div>
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
