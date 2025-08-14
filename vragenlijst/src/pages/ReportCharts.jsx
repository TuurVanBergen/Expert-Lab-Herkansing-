import React, { useEffect, useRef } from "react";
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
import { RISK_COLORS, CHART_COLORS } from "../utils/colors.js";
import { countRisks } from "../utils/dataProcessing.js";
import { baseChartOptions } from "../utils/BaseChartOptions.js";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement
);

export default function ReportPage({ answers }) {
	const donutRef = useRef();
	const barRef = useRef();
	const personalPerQuestionRef = useRef();
	const personalRiskRef = useRef();
	useEffect(() => {
		if (!donutRef.current || !barRef.current) return;

		const donutChart = donutRef.current;
		const barChart = barRef.current;

		const timer = setTimeout(() => {
			window.print();
		}, 2000);

		return () => clearTimeout(timer);
	}, [answers]);

	// Privacyvragen (eerste 4)
	const firstFour = answers.slice(0, 4);
	const triggeredCount = firstFour.filter(
		(a) => a.answer?.toLowerCase() === "ja"
	).length;

	const donutData = {
		labels: ["Dark patterns getriggerd", "Niet getriggerd"],
		datasets: [
			{
				data: [triggeredCount, firstFour.length - triggeredCount],
				backgroundColor: [CHART_COLORS.triggered, CHART_COLORS.notTriggered],
				hoverBackgroundColor: [
					`${CHART_COLORS.triggered}CC`,
					`${CHART_COLORS.notTriggered}CC`,
				],
			},
		],
	};

	const privacyCounts = countRisks(firstFour);
	const barData = {
		labels: ["Privacygevoelige keuzes"],
		datasets: [
			{
				label: "Laag risico",
				data: [privacyCounts.low],
				backgroundColor: RISK_COLORS.low,
			},
			{
				label: "Middel risico",
				data: [privacyCounts.medium],
				backgroundColor: RISK_COLORS.medium,
			},
			{
				label: "Hoog risico",
				data: [privacyCounts.high],
				backgroundColor: RISK_COLORS.high,
			},
			{
				label: "Niet geaccepteerd",
				data: [privacyCounts.noAnswer],
				backgroundColor: RISK_COLORS.neutral,
			},
		],
	};

	// Persoonlijke vragen
	const personalQuestions = answers.slice(4);
	const personalLabels = personalQuestions.map((q) => q.category);
	const personalData = personalQuestions.map((q) =>
		q.answer?.toLowerCase() === "ja" ? 1 : 0
	);
	const personalColors = personalQuestions.map((q) => {
		if (q.answer?.toLowerCase() !== "ja") return RISK_COLORS.neutral;
		return RISK_COLORS[q.risk_level] || RISK_COLORS.neutral;
	});

	const personalPerQuestionData = {
		labels: personalLabels,
		datasets: [
			{ label: "Keuze", data: personalData, backgroundColor: personalColors },
		],
	};

	const personalPerQuestionOptions = {
		...baseChartOptions,
		indexAxis: "y",
		scales: {
			x: {
				beginAtZero: true,
				max: 1,
				ticks: { callback: (v) => (v === 1 ? "Ja" : "Nee"), font: { size: 9 } },
			},
			y: { ticks: { font: { size: 9 } } },
		},
		plugins: { legend: { display: false } },
	};

	const personalRiskCounts = countRisks(personalQuestions);
	const personalRiskData = {
		labels: ["Persoonlijke keuzes"],
		datasets: [
			{
				label: "Laag risico",
				data: [personalRiskCounts.low],
				backgroundColor: RISK_COLORS.low,
			},
			{
				label: "Middel risico",
				data: [personalRiskCounts.medium],
				backgroundColor: RISK_COLORS.medium,
			},
			{
				label: "Hoog risico",
				data: [personalRiskCounts.high],
				backgroundColor: RISK_COLORS.high,
			},
			{
				label: "Niet geaccepteerd",
				data: [personalRiskCounts.noAnswer],
				backgroundColor: RISK_COLORS.neutral,
			},
		],
	};

	return (
		<div id="report-charts" className="report-container">
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
				<div className="chart-row">
					<div className="chart-box">
						<Doughnut ref={donutRef} data={donutData} />
					</div>
					<div className="chart-box">
						<Bar ref={barRef} data={barData} options={baseChartOptions} />
					</div>
				</div>
			</section>

			{/* Persoonlijk profiel */}
			<section className="report-section">
				<h2>Jouw persoonlijke profiel</h2>
				<p>
					We stelden je vragen over je persoonlijkheid, sociale gedrag en
					privacybewustzijn. Dit geeft inzicht in jouw voorkeuren, gevoelens en
					hoe je omgaat met technologie en sociale druk. Hieronder zie je een
					samenvatting van je antwoorden en wat dit over jou zegt.
				</p>
				<div className="chart-row">
					<div className="chart-box">
						<Bar
							ref={personalPerQuestionRef}
							data={personalPerQuestionData}
							options={personalPerQuestionOptions}
						/>
					</div>

					<div className="chart-box">
						<Bar
							ref={personalRiskRef}
							data={personalRiskData}
							options={baseChartOptions}
						/>
					</div>
				</div>
			</section>
			<section className="report-section conclusion-section">
				<h2>Conclusies</h2>
				<p className="conclusion-summary">
					Op basis van je antwoorden zien we duidelijke patronen in hoe je
					omgaat met privacy, technologie en risico. Hieronder vind je per
					onderdeel wat dit betekent, met een inschatting van het risico.
				</p>
				<div className="conclusion-grid">
					{answers.map((a, i) => (
						<div key={i} className={`conclusion-card risk-${a.risk_level}`}>
							<h3>{a.category}</h3>
							<p>{a.insight}</p>
							<span className="risk-label">{a.risk_level}</span>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
