// server.js
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
	console.log("WebSocket connected");

	ws.on("message", (data) => {
		console.log("Received from web:", data.toString());

		// Hier zou je straks TouchDesigner kunnen triggeren
	});
});

console.log("WebSocket server running on ws://localhost:8080");
