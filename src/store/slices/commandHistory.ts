import { createEntityAdapter, createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface HistoryItemParams {
  method: "GET" | "POST";
  path: string;
  body: string;
  results: any;
}

export interface HistoryItem extends HistoryItemParams {
  id: string;
  datetime: number;
  error: boolean;
}

const commandHistoryAdapter = createEntityAdapter<HistoryItem>({
  sortComparer: (a, b) => b.datetime - a.datetime,
});

const commandHistorySlice = createSlice({
  name: "commandHistory",
  initialState: commandHistoryAdapter.getInitialState(),
  reducers: {
    addHistoryItem: commandHistoryAdapter.addOne,
    removeHistoryItem: commandHistoryAdapter.removeOne,
    clearHistory: commandHistoryAdapter.removeAll,
  },
});

export const { addHistoryItem, removeHistoryItem, clearHistory } =
  commandHistorySlice.actions;

export const createHistoryItem = (params: HistoryItemParams) => {
  const id = nanoid();
  const datetime = new Date().getTime();
  const error = !!params.results.error;

  return { id, historyItem: { id, datetime, error, ...params } };
};

const commandHistorySelectors = commandHistoryAdapter.getSelectors<RootState>(
  (state) => state.commandHistory
);
export const selectHistory = (state: RootState) =>
  commandHistorySelectors.selectAll(state);
export const selectHistoryById = (id: string) => (state: RootState) =>
  commandHistorySelectors.selectById(state, id);
export const selectHistoryTotal = (state: RootState) =>
  commandHistorySelectors.selectTotal(state);

export default commandHistorySlice.reducer;
