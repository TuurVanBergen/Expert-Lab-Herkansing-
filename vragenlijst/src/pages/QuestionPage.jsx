import React, { useState } from "react";

function QuestionPage({ question, onAnswer }) {
	const [showConfirmShame, setShowConfirmShame] = useState(false);

	const handleNoClick = () => {
		if (question.text.includes("stemming")) {
			setShowConfirmShame(true);
		} else {
			onAnswer("nee");
		}
	};

	const handleConfirmShameAnswer = (answer) => {
		setShowConfirmShame(false);
		if (answer === "ja") {
			// Confirmshame gelukt, geef ja door
			onAnswer("ja");
		} else {
			// Geen confirmshame
			onAnswer("nee");
		}
	};

	return (
		<div className="question-page">
			<div className="question-box">
				<p className="question-text">{question.text}</p>

				<div className="button-group">
					<button className="yes-btn" onClick={() => onAnswer("ja")}>
						Ja
					</button>
					<button className="no-btn" onClick={handleNoClick}>
						Nee
					</button>
				</div>
			</div>

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
