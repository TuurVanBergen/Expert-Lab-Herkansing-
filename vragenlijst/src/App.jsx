import React, { useState } from "react";
import IntroPage from "./pages/IntroPage";
import QuestionPage from "./pages/QuestionPage";
import EndPage from "./pages/EndPage";
import useWebSocket from "../../td-bridge/hooks/useWebSocket.js";
import "./styles/QuestionPage.css";

const questions = [
	{ text: "Vraag1" },
	{ text: "Vraag2" },
	{ text: "Vraag3" },
	{ text: "Vraag4" },
	{ text: "Vraag5" },
	{ text: "Vraag6" },
	{ text: "Vraag7" },
	{ text: "Vraag8" },
	{ text: "Vraag9" },
	{ text: "Vraag10" },
];

function App() {
	const [step, setStep] = useState(0);
	const [answers, setAnswers] = useState([]);

	// WebSocket initialiseren - pas hier je IP aan
	const { sendMessage } = useWebSocket("ws://localhost:8080");

	const handleStart = () => setStep(1);

	const handleAnswer = (answer) => {
		const questionIndex = step - 1;

		// Verstuur antwoord via WebSocket
		sendMessage({ question: questions[questionIndex].text, answer });

		setAnswers([
			...answers,
			{ question: questions[questionIndex].text, answer },
		]);

		if (step < questions.length) {
			setStep(step + 1);
		} else {
			setStep(-1);
			console.log("Klaar! Antwoorden:", answers);
		}
	};

	if (step === 0) {
		return <IntroPage onStart={handleStart} />;
	} else if (step === -1) {
		return <EndPage />;
	} else {
		return (
			<QuestionPage question={questions[step - 1]} onAnswer={handleAnswer} />
		);
	}
}

export default App;
