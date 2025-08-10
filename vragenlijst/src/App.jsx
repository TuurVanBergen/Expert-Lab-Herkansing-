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

		// Stuur naar websocket
		sendMessage({
			question: currentQuestion.text,
			answer,
			risk_level: currentQuestion.risk_level,
			category: currentQuestion.category,
			source: currentQuestion.source,
		});

		// Antwoord opslaan
		setAnswers((prev) => {
			const updated = [...prev, { ...currentQuestion, answer }];
			if (step >= questions.length) {
				console.log("Alle antwoorden:", updated);
			}

			return updated;
		});

		// Naar volgende stap
		if (step < questions.length) {
			setStep(step + 1);
		} else {
			setStep(-1);
			setTimeout(() => {
				setStep(-2);
			}, 10000);
		}
	};

	// ====== RENDER FLOW ======

	return (
		<>
			<video
				ref={videoRef}
				autoPlay
				muted
				playsInline
				className="background-video"
			/>
			{step === 0 && <IntroPage onStart={handleStart} />}
			{step > 0 && step <= questions.length && (
				<QuestionPage question={questions[step - 1]} onAnswer={handleAnswer} />
			)}
			{step === -1 && <ReportPage answers={answers} />}
		</>
	);
}

export default App;
