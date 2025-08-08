import React, { useState, useEffect, useRef } from "react";
import IntroPage from "./pages/IntroPage";
import QuestionPage from "./pages/QuestionPage";
import EndPage from "./pages/EndPage";
import useWebSocket from "../../td-bridge/hooks/useWebSocket.js";
import "./styles/QuestionPage.css";
import "./index.css";

const questions = [
	{
		text: "Wil je dat we je stemming proberen af te leiden via gezichtsherkenning?",
	},
	{
		text: "Ben je er niet op tegen dat deze installatie eventueel probeert te detecteren met wie je je mogelijk bevindt?",
	},
	{ text: "Mag deze installatie je stem analyseren?" },
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

	return (
		<>
			<video
				ref={videoRef}
				autoPlay
				muted
				playsInline
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					objectFit: "cover",
					zIndex: -1,
				}}
			/>

			{step === 0 && <IntroPage onStart={handleStart} />}
			{step === -1 && <EndPage />}
			{step > 0 && step <= questions.length && (
				<QuestionPage question={questions[step - 1]} onAnswer={handleAnswer} />
			)}
		</>
	);
}

export default App;
