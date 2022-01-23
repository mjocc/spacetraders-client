import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthSlice {
  username: string | null;
  token: string | null;
}

const initialState: AuthSlice = {
  username: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(
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

export const { login, logout } = authSlice.actions;

export const selectAuthenticated = (state: RootState): boolean =>
  !!(state.auth.username && state.auth.token);
export const selectUsername = (state: RootState) => state.auth.username;
export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
