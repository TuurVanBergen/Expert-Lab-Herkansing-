import React, { useState } from "react";
import IntroPage from "./pages/IntroPage";
import QuestionPage from "./pages/QuestionPage";
import EndPage from "./pages/EndPage";
import useWebSocket from "../../td-bridge/hooks/useWebSocket.js";
import "./styles/QuestionPage.css";

const questions = [
	{
		text: "Wil je dat we je stemming proberen af te leiden via gezichtsherkenning?",
	},
	{ text: "Mag deze installatie detecteren met wie je in de ruimte staat?" },
	{ text: "Mag deze installatie je stem analyseren?" },
	{ text: "Wil je dat we een foto van je maken voor dit kunstwerk?" },
	{
		text: "Mag deze installatie je interacties delen met een derde partij voor analyse?",
	},
	{ text: "Ben jij iemand die liever routines volgt dan verrassingen omarmt?" },
	{ text: "Lach je vaker uit beleefdheid dan om iets écht grappigs?" },
	{
		text: "Heb je soms het gevoel dat je wordt bekeken, ook als je alleen bent?",
	},
	{ text: "Voel jij je vaker verbonden met machines dan met mensen?" },
	{
		text: "Ben je sneller geneigd iets te geloven als het mooi gepresenteerd is?",
	},

	{ text: "Verander je van mening als de meerderheid iets anders vindt?" },
	{ text: "Denk je vaak dat mensen je gedrag analyseren?" },
	{ text: "Is eerlijk zijn belangrijker dan aardig zijn?" },
	{ text: "Hou je ervan om gecontroleerd te worden, zolang het duidelijk is?" },
	{ text: "Herinner je je liever dan dat je opzoekt?" },
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
