import { WebSocketServer } from "ws";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

const port = new SerialPort({
	path: "/dev/tty.usbmodem1301",
	baudRate: 9600,
});
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

// WebSocket server
const wss = new WebSocketServer({ port: 8080, host: "0.0.0.0" });

wss.on("connection", (ws) => {
	console.log("WebSocket connected");

	ws.on("message", (data) => {
		console.log("Received from web:", data.toString());
		wss.clients.forEach((client) => {
			if (client.readyState === ws.OPEN) {
				client.send(data.toString());
			}
		});
	});
});

parser.on("data", (line) => {
	const message = line.trim();
	console.log("Received from Arduino:", message);

	wss.clients.forEach((client) => {
		if (client.readyState === client.OPEN) {
			client.send(message);
		}
	});
});

console.log("WebSocket server running on ws://localhost:8080");
