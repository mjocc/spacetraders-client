import { createEntityAdapter, createSlice, nanoid } from '@reduxjs/toolkit';
import { useAppDispatch } from '../hooks';
import { RootState } from '../store';

export type OutcomeToastModes = 'success' | 'error';

interface OutcomeToastParams {
  mode: OutcomeToastModes;
  text: string;
  closeDelay: number;
}

interface OutcomeToast extends OutcomeToastParams {
  id: string;
  datetime: number;
}

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

const { addToast, removeToast } = outcomeToastsSlice.actions;

export const createToast = (
  mode: OutcomeToastModes,
  text: string,
  closeDelay: number
): OutcomeToast => {
  const id = nanoid();
  const datetime = new Date().getTime();

  return { id, datetime, mode, text, closeDelay };
};

export const useToast = () => {
  const dispatch = useAppDispatch();

  const openToast = (
    mode: OutcomeToastModes,
    text: string,
    closeDelay: number = 3000
  ) => {
    const toast = createToast(mode, text, closeDelay);
    dispatch(addToast(toast));
    setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, closeDelay);
  };

  const closeToast = (id: string) => {
    dispatch(removeToast(id));
  };

  return { openToast, closeToast };
};

const outcomeToastSelectors = outcomeToastAdapter.getSelectors<RootState>(
  (state) => state.outcomeToasts
);
export const selectOutcomeToasts = (state: RootState) =>
  outcomeToastSelectors.selectAll(state);

export default outcomeToastsSlice.reducer;
