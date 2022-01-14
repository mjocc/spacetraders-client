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
  name: 'spacetraders',
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
  },
});

export const { initializeSpaceTraders } = spaceTradersSlice.actions;

export const selectAuthenticated = (state: RootState) =>
  state.spaceTraders.username && state.spaceTraders.token;
export const selectToken = (state: RootState) => state.spaceTraders.token;

export default spaceTradersSlice.reducer;
