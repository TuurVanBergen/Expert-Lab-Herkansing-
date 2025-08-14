import React, { useState, useEffect, useRef } from "react";
import IntroPage from "./pages/IntroPage";
import QuestionPage from "./pages/QuestionPage";
import EndPage from "./pages/EndPage";
import ReportCharts from "./pages/ReportCharts";
import useWebSocket from "../../td-bridge/hooks/useWebSocket.js";
import "./styles/QuestionPage.css";
import "./index.css";

import questions from "./utils/QuestionData.js";

function App() {
	// App state
	const [step, setStep] = useState(0); // 0 = Intro, 1..n = vragen, -1 = einde
	const [answers, setAnswers] = useState([]);
	const [digitalBtnPressed, setDigitalBtnPressed] = useState(null);
	const videoRef = useRef(null);

	const { sendMessage } = useWebSocket("ws://localhost:8080");

	// Start virtuele camera
	useEffect(() => {
		async function getVirtualCam() {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: true,
				});
				if (videoRef.current) videoRef.current.srcObject = stream;
			} catch (err) {
				console.error("Kan Virtual Camera stream niet openen:", err);
			}
		}
		getVirtualCam();
	}, []);

	// WebSocket listener voor fysieke knoppen
	useEffect(() => {
		const ws = new WebSocket("ws://localhost:8080");
		ws.onopen = () => console.log("WebSocket verbonden");

		ws.onmessage = (event) => {
			const msg = String(event.data).trim();
			console.log("WebSocket bericht:", msg);

			// Intro pagina: alleen knoppen registreren
			if (step === 0) {
				if (msg === "YES_BTN" || msg === "NO_BTN") {
					setDigitalBtnPressed(msg === "YES_BTN" ? "ja" : "nee");
					setTimeout(() => setDigitalBtnPressed(null), 300);
				}
				return;
			}

			// Vragenpagina: antwoorden verwerken
			if (msg === "YES_BTN") {
				handleAnswer("ja", true);
			} else if (msg === "NO_BTN") {
				if (questions[step - 1]?.text.includes("stemming")) {
					setDigitalBtnPressed("nee");
					document.dispatchEvent(new CustomEvent("arduino-no-pressed"));
				} else {
					handleAnswer("nee", true);
				}
			}
		};

		ws.onerror = (err) => console.error("WebSocket fout:", err);
		return () => ws.close();
	}, [step]);

	// Start vragenreeks
	const handleStart = () => setStep(1);

	// Antwoord verwerken
	const handleAnswer = (answer, physical = false) => {
		const currentQuestion = questions[step - 1];
		if (!currentQuestion) return;

		// Visueel effect bij fysieke knop
		if (physical) {
			setDigitalBtnPressed(answer);
			setTimeout(() => setDigitalBtnPressed(null), 300);
		}

		// Verzenden naar WebSocket server
		sendMessage({
			question: currentQuestion.text,
			answer,
			risk_level: currentQuestion.risk_level,
			category: currentQuestion.category,
			source: currentQuestion.source,
		});

		// Antwoorden opslaan
		setAnswers((prev) => [...prev, { ...currentQuestion, answer }]);

		// Volgende stap of einde
		if (step < questions.length) {
			setStep(step + 1);
		} else {
			// Ga naar einde
			setStep(-1);

			// Na X seconden terug naar start (home)
			setTimeout(() => setStep(0), 20000); // 20 seconden
		}
	};

	return (
		<>
			{/* Achtergrond video */}
			<video
				ref={videoRef}
				autoPlay
				muted
				playsInline
				className="background-video"
			/>

			{/* Intro pagina */}
			{step === 0 && (
				<IntroPage
					onStart={handleStart}
					digitalBtnPressed={digitalBtnPressed}
				/>
			)}

			{/* Vraag pagina */}
			{step > 0 && step <= questions.length && (
				<QuestionPage
					question={questions[step - 1]}
					onAnswer={handleAnswer}
					digitalBtnPressed={digitalBtnPressed}
				/>
			)}

			{/* Eindpagina + rapport */}
			{step === -1 && (
				<>
					<EndPage />
					<ReportCharts
						answers={answers}
						id="report-charts"
						style={{ position: "absolute", left: "0", visibility: "visible" }}
					/>
				</>
			)}
		</>
	);
}

export default App;
