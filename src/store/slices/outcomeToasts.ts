import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OutcomeToastModes } from '../../components/OutcomeToasts';
import { AppDispatch, RootState } from '../store';

interface OutcomeToastsSlice {
  mode: OutcomeToastModes;
  successText: string;
  errorText: string;
}

const initialState: OutcomeToastsSlice = {
  mode: null,
  successText: 'Command successfully executed.',
  errorText: 'Something went wrong. Please try again.',
};

const outcomeToastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    setToastMode(
      state,
      {
        payload: { mode, error, success },
      }: PayloadAction<{
        mode: OutcomeToastModes;
        error?: string;
        success?: string;
      }>
    ) {
      state.mode = mode;

      if (error) {
        state.errorText = error;
      }
      if (success) {
        state.successText = success;
      }
    },
    closeToast(state) {
      state.mode = initialState.mode;
    },
    resetToastText(state) {
      state.successText = initialState.successText;
      state.errorText = initialState.errorText;
    },
  },
});

const { setToastMode, closeToast, resetToastText } = outcomeToastsSlice.actions;

const getOpenToast =
  (dispatch: AppDispatch) =>
  (
    mode: OutcomeToastModes,
    messages?: { error?: string; success?: string }
  ) => {
    const params = messages ? { mode, ...messages } : { mode };
    dispatch(setToastMode(params));
  };
const getCloseToast = (dispatch: AppDispatch) => () => {
  dispatch(closeToast());
  setTimeout(() => {
    dispatch(resetToastText());
  }, 150);
};
export const getManageToast = (dispatch: AppDispatch) => {
  return {
    openToast: getOpenToast(dispatch),
    closeToast: getCloseToast(dispatch),
  };
};

export const selectMode = (state: RootState) => state.outcomeToasts.mode;
export const selectBodyText = (state: RootState) => ({
  success: state.outcomeToasts.successText,
  error: state.outcomeToasts.errorText,
});

export default outcomeToastsSlice.reducer;
