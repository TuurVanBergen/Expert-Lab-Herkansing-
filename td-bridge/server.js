// server.js
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080, host: "0.0.0.0" });

wss.on("connection", (ws) => {
	console.log("WebSocket connected");

	ws.on("message", (data) => {
		console.log("Received from web:", data.toString());

		// Broadcast naar alle clients (inclusief TouchDesigner)
		wss.clients.forEach((client) => {
			if (client.readyState === ws.OPEN) {
				client.send(data.toString());
			}
		});
	});
});

console.log("WebSocket server running on ws://localhost:8080");
