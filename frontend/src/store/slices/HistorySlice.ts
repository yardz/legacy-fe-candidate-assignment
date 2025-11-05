import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface HistoryItem {
	message: string;
	signature: string;
	signer: string;
	verified: boolean;
}

export interface HistoryState {
	history: HistoryItem[];
}

const initialState: HistoryState = {
	history: [],
};

export const HistorySlice = createSlice({
	name: "history",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<HistoryItem>) => {
			state.history.push(action.payload);
		},
		clear: (state) => {
			state.history = [];
		},
	},
	selectors: {
		selectHistory: (state) => state.history,
	},
});
