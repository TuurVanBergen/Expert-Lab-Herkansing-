// App.jsx
import React, { useState, useEffect, useRef } from "react";
import IntroPage from "./pages/IntroPage";
import ReportPage from "./pages/ReportCharts.jsx";
import QuestionPage from "./pages/QuestionPage";
import EndPage from "./pages/EndPage";
import ReportCharts from "./pages/ReportCharts";
import useWebSocket from "../../td-bridge/hooks/useWebSocket.js";
import "./styles/QuestionPage.css";
import "./index.css";

// Je bestaande vragenlijst
import questions from "./utils/QuestionData.js";

function App() {
	const [step, setStep] = useState(0); // 0 = intro, 1..n = vragen, -1 = einde
	const [answers, setAnswers] = useState([]);
	const videoRef = useRef(null);
	const { sendMessage } = useWebSocket("ws://localhost:8080");

	// Camera starten bij laden app
	useEffect(() => {
		async function getVirtualCam() {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: true,
				});
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
				}
			} catch (err) {
				console.error("Kan Virtual Camera stream niet openen:", err);
			}
		}
		getVirtualCam();
	}, []);

	const handleStart = () => setStep(1);

	const handleAnswer = (answer) => {
		const questionIndex = step - 1;
		const currentQuestion = questions[questionIndex];

		// Verstuur antwoord via WebSocket
		sendMessage({
			question: currentQuestion.text,
			answer,
			risk_level: currentQuestion.risk_level,
			category: currentQuestion.category,
			source: currentQuestion.source,
		});

		// Sla antwoord lokaal op
		setAnswers((prev) => [...prev, { ...currentQuestion, answer }]);

		const processedAnswers = questions.map((q, i) => {
			const userAnswer = answers[i];
			let triggered = false;

			// Alleen checken voor de eerste 4 vragen en als er een dark_pattern is
			if (i < 4 && q.dark_pattern) {
				const condition = q.dark_pattern.triggered_if;

				if (condition === "Gebruiker kiest 'Nee'" && userAnswer === "no") {
					triggered = true;
				} else if (
					condition === "Gebruiker kiest 'Ja'" &&
					userAnswer === "yes"
				) {
					triggered = true;
				} else if (
					condition === "Gebruiker laat standaardantwoord ongewijzigd." &&
					userAnswer === "yes"
				) {
					// Voor preselectie, aangenomen dat "yes" betekent ongewijzigd
					triggered = true;
				}
			}

			return { ...q, userAnswer, dark_pattern_triggered: triggered };
		});

		// Volgende stap
		if (step < questions.length) {
			setStep(step + 1);
		} else {
			// Laat eerst EndPage zien
			setStep(-1);

			// Na korte tijd automatisch ReportCharts printen
			setTimeout(() => {
				setStep(-2); // -2 = ReportCharts fase
			}, 10000);
		}
	};

	// ====== RENDER FLOW ======

	if (step === 0) {
		return <IntroPage onStart={handleStart} />;
	} else if (step > 0 && step <= questions.length) {
		return (
			<QuestionPage question={questions[step - 1]} onAnswer={handleAnswer} />
		);
	} else if (step === -1) {
		// Dit is normaal je EndPage
		// Maak dit tijdelijk zo:
		return <ReportPage answers={answers} />;
	}

	return null;
}

export default App;
