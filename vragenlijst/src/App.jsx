import React, { useState, useEffect, useRef } from "react";
import IntroPage from "./pages/IntroPage";
import ReportPage from "./pages/ReportCharts.jsx";
import QuestionPage from "./pages/QuestionPage";
import EndPage from "./pages/EndPage";
import ReportCharts from "./pages/ReportCharts";
import useWebSocket from "../../td-bridge/hooks/useWebSocket.js";
import "./styles/QuestionPage.css";
import "./index.css";

import questions from "./utils/QuestionData.js";

function App() {
	const [step, setStep] = useState(0); // 0 = intro, 1..n = vragen, -1 = einde
	const [answers, setAnswers] = useState([]);
	const [digitalBtnPressed, setDigitalBtnPressed] = useState(null); // "ja" of "nee" voor visueel effect
	const videoRef = useRef(null);
	const { sendMessage } = useWebSocket("ws://localhost:8080");

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

	// WebSocket listener voor fysieke knoppen
	useEffect(() => {
		const ws = new WebSocket("ws://localhost:8080");

		ws.onopen = () => {
			console.log("WebSocket verbonden");
		};

		ws.onmessage = (event) => {
			const msg = event.data;
			console.log("WebSocket bericht:", msg);

			if (msg === "YES_BTN") {
				handleAnswer("ja", true);
			} else if (msg === "NO_BTN") {
				handleAnswer("nee", true);
			}
		};

		ws.onerror = (err) => {
			console.error("WebSocket fout:", err);
		};

		return () => ws.close();
	}, [step, answers]);

	const handleStart = () => setStep(1);

	// Nieuwe parameter: physical = true als via fysieke knop
	const handleAnswer = (answer, physical = false) => {
		const questionIndex = step - 1;
		const currentQuestion = questions[questionIndex];

		if (!currentQuestion) return;

		// Visueel effect digitale knop
		if (physical) {
			setDigitalBtnPressed(answer);
			// Reset na korte tijd
			setTimeout(() => setDigitalBtnPressed(null), 300);
		}

		sendMessage({
			question: currentQuestion.text,
			answer,
			risk_level: currentQuestion.risk_level,
			category: currentQuestion.category,
			source: currentQuestion.source,
		});

		setAnswers((prev) => {
			const updated = [...prev, { ...currentQuestion, answer }];
			if (step >= questions.length) {
				console.log("Alle antwoorden:", updated);
			}
			return updated;
		});

		if (step < questions.length) {
			setStep(step + 1);
		} else {
			setStep(-1);
			setTimeout(() => {
				setStep(-2);
			}, 100000);
		}
	};

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
				<QuestionPage
					question={questions[step - 1]}
					onAnswer={handleAnswer}
					digitalBtnPressed={digitalBtnPressed} // prop om visueel effect te triggeren
				/>
			)}
			{step === -1 && <ReportPage answers={answers} />}
		</>
	);
}

export default App;
