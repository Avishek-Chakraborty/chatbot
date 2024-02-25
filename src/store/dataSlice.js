import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	arrayOfStrings: '',
};

const dataSlice = createSlice({
	name: "data",
	initialState,
	reducers: {
		addData: (state, action) => {
			state.arrayOfStrings = action.payload;
		},
		removeData: (state) => {
			state.arrayOfStrings = '';
		},
	},
});

export const {addData, removeData} = dataSlice.actions

export default dataSlice.reducer;
