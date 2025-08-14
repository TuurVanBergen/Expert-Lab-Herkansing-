// utils/BaseChartOptions.js
export const baseChartOptions = {
	responsive: true,
	maintainAspectRatio: true,
	plugins: {
		legend: {
			position: "bottom",
			labels: { font: { size: 10 } },
		},
	},
	scales: {
		x: { stacked: true, ticks: { font: { size: 9 } } },
		y: {
			stacked: true,
			beginAtZero: true,
			ticks: { stepSize: 1, font: { size: 9 } },
		},
	},
};
