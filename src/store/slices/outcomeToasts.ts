import { createEntityAdapter, createSlice, nanoid } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';

type OutcomeToastModes = 'success' | 'error';

interface OutcomeToastParams {
  mode: OutcomeToastModes;
  text: string;
  closeDelay: number;
}

interface OutcomeToast extends OutcomeToastParams {
  id: string;
  datetime: number;
}

//   successText: 'Command successfully executed.',
//   errorText: 'Something went wrong. Please try again.',

const outcomeToastAdapter = createEntityAdapter<OutcomeToast>({
  sortComparer: (a, b) => a.datetime - b.datetime,
});

const outcomeToastsSlice = createSlice({
  name: 'outcomeToasts',
  initialState: outcomeToastAdapter.getInitialState(),
  reducers: {
    addToast: outcomeToastAdapter.addOne,
    removeToast: outcomeToastAdapter.removeOne,
  },
});

export const { addToast, removeToast } = outcomeToastsSlice.actions;

export const createToast = (
  mode: OutcomeToastModes,
  text: string,
  closeDelay: number
): OutcomeToast => {
  const id = nanoid();
  const datetime = new Date().getTime();

  return { id, datetime, mode, text, closeDelay };
};

export const getOpenToast =
  (dispatch: AppDispatch) =>
  (mode: OutcomeToastModes, text: string, closeDelay: number = 3000) =>
    dispatch(addToast(createToast(mode, text, closeDelay)));

const outcomeToastSelectors = outcomeToastAdapter.getSelectors<RootState>(
  (state) => state.outcomeToasts
);
export const selectOutcomeToasts = (state: RootState) =>
  outcomeToastSelectors.selectAll(state);

export default outcomeToastsSlice.reducer;
