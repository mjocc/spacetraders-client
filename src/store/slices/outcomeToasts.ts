import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OutcomeToastModes } from '../../components/OutcomeToasts';
import { AppDispatch, RootState } from '../store';

interface OutcomeToastsSlice {
  mode: OutcomeToastModes;
  successText: string;
  errorText: string;
  closeDelay: number;
}

const initialState: OutcomeToastsSlice = {
  mode: null,
  successText: 'Command successfully executed.',
  errorText: 'Something went wrong. Please try again.',
  closeDelay: 3000,
};

interface SetToastModeParams {
  mode: OutcomeToastModes;
  error?: string;
  success?: string;
  closeDelay?: number;
}

const outcomeToastsSlice = createSlice({
  name: 'outcomeToasts',
  initialState,
  reducers: {
    setToastMode(
      state,
      {
        payload: { mode, error, success, closeDelay },
      }: PayloadAction<SetToastModeParams>
    ) {
      state.mode = mode;

      if (error) {
        state.errorText = error;
      }
      if (success) {
        state.successText = success;
      }
      if (closeDelay) {
        state.closeDelay = closeDelay;
      }
    },
    closeToast(state) {
      state.mode = initialState.mode;
    },
    resetToastDetails(state) {
      state.successText = initialState.successText;
      state.errorText = initialState.errorText;
      state.closeDelay = initialState.closeDelay;
    },
  },
});

const { setToastMode, closeToast, resetToastDetails } =
  outcomeToastsSlice.actions;

const getOpenToast =
  (dispatch: AppDispatch) =>
  (
    mode: OutcomeToastModes,
    messages?: { error?: string; success?: string },
    closeDelay?: number
  ) => {
    let params: SetToastModeParams = { mode };
    if (messages) {
      params = { ...params, ...messages };
    }
    if (closeDelay) {
      params = { ...params, closeDelay };
    }

    dispatch(setToastMode(params));
  };
const getCloseToast = (dispatch: AppDispatch) => () => {
  dispatch(closeToast());
  setTimeout(() => {
    dispatch(resetToastDetails());
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
export const selectCloseDelay = (state: RootState) =>
  state.outcomeToasts.closeDelay;

export default outcomeToastsSlice.reducer;
