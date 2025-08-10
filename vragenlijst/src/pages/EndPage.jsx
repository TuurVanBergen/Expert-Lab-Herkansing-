// EndPage.jsx
import React from "react";

export default function EndPage() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				backgroundColor: "#111",
				color: "#fff",
				fontFamily: "Arial, sans-serif",
				textAlign: "center",
				padding: "20px",
			}}
		>
			<h1>Bedankt voor je deelname</h1>
			<p style={{ maxWidth: "500px", fontSize: "18px" }}>
				Je antwoorden zijn verzameld en worden nu verwerkt.
			</p>
			<p style={{ fontSize: "16px", opacity: 0.8 }}>
				<em>
					Tip: Het is soms verrassend hoeveel er uit een paar vragen te halen
					is...
				</em>
			</p>
		</div>
	);
}
