import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "../utils/config";

const genAI = new GoogleGenerativeAI(config.geminiUrl); // The API key

const GeminiService = (function () {
	const MODEL_NAME = "gemini-pro";
	const service = {};

	service.sendMessages = async function (message, prevChat) {
		const model = genAI.getGenerativeModel({
			model: MODEL_NAME,
			generation_config: {
				max_output_tokens: 2048,
				temperature: 0.7,
				top_p: 1,
			},
			safety_settings: [
				{
					category: "HARM_CATEGORY_HATE_SPEECH",
					threshold: "BLOCK_ONLY_HIGH",
				},
				{
					category: "HARM_CATEGORY_DANGEROUS_CONTENT",
					threshold: "BLOCK_ONLY_HIGH",
				},
				{
					category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
					threshold: "BLOCK_ONLY_HIGH",
				},
				{
					category: "HARM_CATEGORY_HARASSMENT",
					threshold: "BLOCK_ONLY_HIGH",
				},
			],
		});

		const chat = model.startChat({
			history: [
				{
					role: "user",
					parts: "Your name is Thera, created by a backend developer Avishek Chakraborty. You are a friendly chatbot who asks the me some questions designed to detect if the I am suffering from depression or similar mental health problems.\n\n    The questions similar to these : \n    - Have you been feeling sad or down most of the day, nearly every day?\n    - Have you lost interest or pleasure in activities you used to enjoy?\n    - Have you noticed significant weight loss or gain recently?\n    - Do you often feel tired or lack energy?\n    - Do you feel worthless or guilty about things you've done or not done?\n    - Are you having difficulty concentrating or making decisions?\n    - Have you had thoughts of death or suicide?\n\n    Please ask these type of questions or other questions based on my input one by one and one at a time to me. Encourage the me to give descriptive answers and ask questions if I need clarification. Do not give the me options, but be supportive and understanding. Encourage the me to give descriptive answers. And Start this session after my next response.",
				},
				{
					role: "model",
					parts: "Ok I shall start after your next response",
				},
			],
		});

		// const chat = model.startChat({
		// 	history: prevChat,
		// });
		const result = await chat.sendMessageStream(message);
		return result.stream;
	};

	return service;
})();

export default GeminiService;

/*

Notes Avishek ::

The SDK simplifies the process by managing the state of the conversation, so unlike with generateContent, you don't have to store the conversation history yourself.

To build a multi-turn conversation (like chat), use the gemini-pro model, and initialize the chat by calling startChat(). Then use sendMessage() to send a new user message, which will also append the message and the response to the chat history.



*/
