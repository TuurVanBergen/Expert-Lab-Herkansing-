import "../styles/QuestionPage.css";
import React from "react";
function QuestionPage({ question, onAnswer }) {
	return (
		<div className="question-page">
			<div className="question-box">
				<p className="question-text">{question.text}</p>
				<div className="button-group">
					<button className="yes-btn" onClick={() => onAnswer("yes")}>
						Ja
					</button>
					<button className="no-btn" onClick={() => onAnswer("no")}>
						Nee
					</button>
				</div>
			</div>
		</div>
	);
}

export default QuestionPage;
