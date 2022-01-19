import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SpaceTradersSlice {
  username: string | null;
  token: string | null;
}

const initialState: SpaceTradersSlice = {
  username: null,
  token: null,
};

const spaceTradersSlice = createSlice({
  name: 'spaceTraders',
  initialState,
  reducers: {
    initializeSpaceTraders(
      state,
      {
        payload: { username, token },
      }: PayloadAction<{ username: string; token: string }>
    ) {
      state.username = username;
      state.token = token;
    },
    logout(state) {
      state.username = null;
      state.token = null;
    },
  },
});

export const { initializeSpaceTraders, logout } = spaceTradersSlice.actions;

export const selectAuthenticated = (state: RootState): boolean =>
  !!(state.spaceTraders.username && state.spaceTraders.token);
export const selectUsername = (state: RootState) => state.spaceTraders.username;
export const selectToken = (state: RootState) => state.spaceTraders.token;

export default spaceTradersSlice.reducer;
