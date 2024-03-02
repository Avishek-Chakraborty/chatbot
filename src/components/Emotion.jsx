import React, { useEffect, useState } from "react";
import EmotionService from "../service/SamLowe-roberta-base-go_emotions.service";
import { useDispatch, useSelector } from "react-redux";
import { removeData as clearStoreData } from "../store/dataSlice";

const Emotion = () => {
	const [data, setData] = useState(null);
	const dataString = useSelector((state) => state.data.arrayOfStrings);
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			const result = await EmotionService(dataString);
			setData(result);
			console.log("Result in component :: ", result);
		})();
	}, [dataString, data]);

	return (
		<>
			<div>{data ? JSON.stringify(data) : "Loading..."}</div>
			<button onClick={() => dispatch(clearStoreData())}>Clear Data</button>
		</>
	);
};

export default Emotion;
