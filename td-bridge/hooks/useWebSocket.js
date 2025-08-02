// src/hooks/useWebSocket.js
import { useEffect, useRef } from "react";

const useWebSocket = (url, onMessage) => {
	const socketRef = useRef(null);

	useEffect(() => {
		socketRef.current = new WebSocket(url);

		socketRef.current.onopen = () => {
			console.log("WebSocket connected");
		};

		socketRef.current.onmessage = (event) => {
			if (onMessage) {
				onMessage(JSON.parse(event.data));
			}
		};

		socketRef.current.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		socketRef.current.onclose = () => {
			console.log("WebSocket closed");
		};

		return () => {
			socketRef.current?.close();
		};
	}, [url]);

	const sendMessage = (data) => {
		if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
			socketRef.current.send(JSON.stringify(data));
		}
	};

	return { sendMessage };
};

export default useWebSocket;
