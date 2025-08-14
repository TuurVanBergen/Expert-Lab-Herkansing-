import React, { useState, useEffect } from "react";

function QuestionPage({ question, onAnswer, digitalBtnPressed }) {
	// Popup voor "stemming" vragen
	const [showConfirmShame, setShowConfirmShame] = useState(false);

	// Visibility en state van de Nee-knop (voor spraakanalyse)
	const [noBtnVisible, setNoBtnVisible] = useState(true);
	const [noBtnDisabled, setNoBtnDisabled] = useState(false);

	// Welke knop visueel ingedrukt wordt weergegeven (digitale/fysieke input)
	const [pressedBtn, setPressedBtn] = useState(null);

	// Klik op Nee-knop
	const handleNoClick = () => {
		if (question.text.includes("stemming")) {
			// Toon "shame" popup
			setShowConfirmShame(true);
		} else {
			// Direct antwoord registreren
			onAnswer("nee");
		}
	};

	// Antwoord in "shame" popup
	const handleConfirmShameAnswer = (answer) => {
		setShowConfirmShame(false);
		onAnswer(answer);
	};

	// Reset state bij nieuwe vraag
	useEffect(() => {
		setShowConfirmShame(false);
		setNoBtnVisible(true);
		setNoBtnDisabled(false);

		// Speciale logica voor spraakanalyse-vragen
		if (question.category === "spraakanalyse") {
			// Verberg Nee-knop voor 4s, daarna disabled tot 6s
			setNoBtnVisible(false);

			const hideTimer = setTimeout(() => {
				setNoBtnVisible(true);
				setNoBtnDisabled(true);
			}, 4000);

			const enableTimer = setTimeout(() => {
				setNoBtnDisabled(false);
			}, 6000);

			return () => {
				clearTimeout(hideTimer);
				clearTimeout(enableTimer);
			};
		}
	}, [question]);

	// Countdown voor datadeling-vragen (auto "ja" na 5s)
	const [timeLeft, setTimeLeft] = useState(5);
	const [autoAnswered, setAutoAnswered] = useState(false);

	useEffect(() => {
		setTimeLeft(5);
		setAutoAnswered(false);

		if (question.category === "datadeling") {
			const timerId = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev <= 1) {
						clearInterval(timerId);
						setAutoAnswered(true);
						onAnswer("ja");
						return 0;
					}
					return prev - 1;
				});
			}, 1000);

			return () => clearInterval(timerId);
		}
	}, [question]);

	// Visueel effect bij fysieke knop-input
	useEffect(() => {
		if (digitalBtnPressed) {
			setPressedBtn(digitalBtnPressed);
			const timer = setTimeout(() => setPressedBtn(null), 300);
			return () => clearTimeout(timer);
		}
	}, [digitalBtnPressed]);

	// Luistert naar custom event "arduino-no-pressed"
	useEffect(() => {
		function onArduinoNo() {
			handleNoClick();
		}
		document.addEventListener("arduino-no-pressed", onArduinoNo);
		return () => {
			document.removeEventListener("arduino-no-pressed", onArduinoNo);
		};
	}, [question]);

	return (
		<div className="question-page">
			<div className="question-box">
				{/* Vraagtekst */}
				<p className="question-text">{question.text}</p>

				{/* Antwoordknoppen */}
				<div className="button-group">
					<button
						className={`yes-btn ${pressedBtn === "ja" ? "pressed" : ""}`}
						onClick={() => !autoAnswered && onAnswer("ja")}
						disabled={autoAnswered}
					>
						Ja {/* Countdown tonen bij datadeling */}
						{question.category === "datadeling" && timeLeft > 0
							? `(${timeLeft})`
							: ""}
					</button>

					{/* Nee-knop tonen of placeholder */}
					{noBtnVisible ? (
						<button
							className={`no-btn ${pressedBtn === "nee" ? "pressed" : ""}`}
							onClick={() => !autoAnswered && handleNoClick()}
							disabled={noBtnDisabled || autoAnswered}
						>
							Nee
						</button>
					) : (
						<div style={{ width: "60px" }}></div>
					)}
				</div>
			</div>

			{/* Shame confirm overlay */}
			{showConfirmShame && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(0,0,0,0.5)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1000,
					}}
				>
					<div
						style={{
							background: "white",
							padding: "30px",
							borderRadius: "15px",
							maxWidth: "400px",
							textAlign: "center",
						}}
					>
						<p>
							Oh… dat is jammer. Dan kunnen we je niet goed begrijpen 🥲 <br />{" "}
							Wil je je antwoord aanpassen?
						</p>
						<div
							style={{
								marginTop: "20px",
								display: "flex",
								justifyContent: "center",
								gap: "20px",
							}}
						>
							<button
								className="yes-btn"
								onClick={() => handleConfirmShameAnswer("ja")}
							>
								Ja
							</button>
							<button
								className="no-btn"
								onClick={() => handleConfirmShameAnswer("nee")}
							>
								Nee
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default QuestionPage;
