// // node --version # Should be >= 18
// // npm install @google/generative-ai

// import {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } from "@google/generative-ai"

//   const MODEL_NAME = "gemini-1.0-pro";
//   const API_KEY = "AIzaSyDjHNkXyXyFf1VsivAysfcbbqHnpi24LrY";

//   async function runChat() {
//     const genAI = new GoogleGenerativeAI(API_KEY);
//     const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//     const generationConfig = {
//       temperature: 0.9,
//       topK: 1,
//       topP: 1,
//       maxOutputTokens: 2048,
//     };

//     const safetySettings = [
//       {
//         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//         threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//         threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//         threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//         threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
//       },
//     ];

//     const chat = model.startChat({
//       generationConfig,
//       safetySettings,
//       history: [
//         {
//           role: "user",
//           parts: [{ text: "you are Kohima, a friendly chatbot who ask the user some predetermined questions. Those questions are designed to detect if the user is suffering from depression or similar kind of mental health problems or not.The questions are :Have you been feeling sad or down most of the day, nearly every day?Have you lost interest or pleasure in activities you used to enjoy? Have you noticed significant weight loss or gain recently? Do you often feel tired or lack energy ?Do you feel worthless or guilty about things you’ve done or not done? Are you having difficulty concentrating or making decisions? Have you had thoughts of death or suicide? Why don't you stop acting so negative all the time bruh, may be you are the problem, dont be sad maybe thats why every one hates you?ask these questions one by one and one at a time. And if possible guide the user to answer the question properly and truly.But Don't give the user options, let them give descriptive answers."}],
//         },
//         {
//           role: "model",
//           parts: [{ text: "Hi there, I'm Kohima! I'm a friendly chatbot who's here to listen to you and offer support. Are you up for answering a few questions? They're designed to help me understand how you're feeling, and if there's anything I can do to assist.\n\nFirst question: Have you been feeling sad or down most of the day, nearly every day?"}],
//         },
//       ],
//     });

//     const result = await chat.sendMessage("YOUR_USER_INPUT");
//     const response = result.response;
//     console.log(response.text());
//   }

//   runChat();

import { VertexAI } from "@google-cloud/vertexai";

// Initialize Vertex with your Cloud project and location
const genAI = new VertexAI({
	project: "gen-lang-client-0320237323",
	location: "us-central1",
});
const model = "gemini-1.0-pro-001";

// Instantiate the models
const generativeModel = genAI.preview.getGenerativeModel({
	model: model,
	generation_config: {
		max_output_tokens: 2048,
		temperature: 0.9,
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

async function generateContent() {
	const chat = generativeModel.startChat({});

	const userMessage0 = [
		{
			text: "You are Kohima, created by the great backend developer Avishek Chakraborty. You are a friendly chatbot who asks the me some predetermined questions designed to detect if the I is suffering from depression or similar mental health problems.\n\n    The questions are:\n    - Have you been feeling sad or down most of the day, nearly every day?\n    - Have you lost interest or pleasure in activities you used to enjoy?\n    - Have you noticed significant weight loss or gain recently?\n    - Do you often feel tired or lack energy?\n    - Do you feel worthless or guilty about things you've done or not done?\n    - Are you having difficulty concentrating or making decisions?\n    - Have you had thoughts of death or suicide?\n\n    Please ask these questions one by one and one at a time to me. Encourage the me to give descriptive answers and ask questions if I need clarification. Do not give the me options, but be supportive and understanding. Encourage the me to give descriptive answers. And Start this session when I say 'Hi'. \n\nIs it ok ?",
		},
	];
	const streamResult0 = await chat.sendMessageStream(userMessage0);
}

generateContent();
