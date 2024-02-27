import { useEffect, useState } from "react";
import GeminiService from "../service/gemini.service";

import { useDispatch } from "react-redux";
import { addData } from "../store/dataSlice";

export default function useGemini() {
	const [messages, updateMessage] = useState(checkForMessages());
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	function checkForMessages() {
		const savedMessages = localStorage.getItem("messages");
		return savedMessages ? JSON.parse(savedMessages) : [];
	}

	useEffect(() => {
		const saveMessages = () =>
			localStorage.setItem("messages", JSON.stringify(messages));
		window.addEventListener("beforeunload", saveMessages);
		return () => window.removeEventListener("beforeunload", saveMessages);
	}, [messages]);

	const sendMessages = async (payload) => {
		updateMessage((prevMessages) => [
			...prevMessages,
			{ role: "model", parts: [{ text: "" }] },
		]);
		setLoading(true);
		try {
			console.log("Here is the final storage :: ", payload);
			const stream = await GeminiService.sendMessages(
				payload.message,
				payload.history
			);
			setLoading(false);
			for await (const chunk of stream) {
				const chuckText = chunk.text();
				updateMessage((prevMessages) => {
					const prevMessageClone = structuredClone(prevMessages);
					prevMessageClone[prevMessages.length - 1].parts[0].text +=
						chuckText;
					return prevMessageClone;
				});
			}
		} catch (error) {
			updateMessage([
				...messages,
				{
					role: "model",
					parts: [
						{
							text: "Seems like I'm having trouble connecting to the server. Please try again later.",
						},
					],
				},
			]);
			console.error("Myyy!!! An error occurred in Gemini API fetch :: ", error);
		} finally {
			setLoading(false);
		}
	};

	const storeMessagesToStore = async (payload) => {
		// const csvString = payload.join("\n");
		// const blob = new Blob([csvString], { type: "text/csv" });
		// const url = URL.createObjectURL(blob);
		// const link = document.createElement("a");
		// link.href = url;
		// link.download = "depressionDataNew.csv";
		// link.click();
		// URL.revokeObjectURL(url);

		const dataString = payload.join("\n");
		// dispatch(addData({ arrayOfStrings: dataString }));
		dispatch(addData(payload));
	};

	return {
		messages,
		loading,
		sendMessages,
		updateMessage,
		storeMessagesToStore,
	};
}
