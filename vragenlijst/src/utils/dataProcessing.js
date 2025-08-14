// utils/dataProcessing.js
export function countRisks(questions) {
	return questions.reduce(
		(acc, q) => {
			if (q.answer?.toLowerCase() === "ja") {
				acc[q.risk_level] = (acc[q.risk_level] || 0) + 1;
			} else {
				acc.noAnswer++;
			}
			return acc;
		},
		{ low: 0, medium: 0, high: 0, noAnswer: 0 }
	);
}
