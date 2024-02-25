import config from "../utils/config";

async function EmotionService(dataString) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
		{
			headers: { Authorization: `Bearer ${config.emotionAPI}` },
			method: "POST",
			body: JSON.stringify(dataString),
		}
	);
	const result = await response.json();
	console.log("Myyy!!!! The result from service :: ",result);
	return result;
}

export default EmotionService;


// 	const dataString = useSelector((state) => {state.data.arrayOfStrings})

// async function query(data) {
// 	const response = await fetch(
// 		"https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
// 		{
// 			headers: { Authorization: `Bearer ${config.emotionAPI}` },
// 			method: "POST",
// 			body: JSON.stringify(data),
// 		}
// 	);
// 	const result = await response.json();
// 	return result;
// }

// query({ inputs: "I like you. I love you" }).then((response) => {
// 	console.log(JSON.stringify(response));
// });

