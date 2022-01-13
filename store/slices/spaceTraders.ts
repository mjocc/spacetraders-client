import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SpaceTraders } from 'spacetraders-sdk';
import type { SpaceTraders as SpaceTradersType } from 'spacetraders-sdk';

interface SpaceTradersSlice {
  spaceTraders: SpaceTradersType | null;
}

const initialState: SpaceTradersSlice = {
  spaceTraders: null,
};

const initializeSpaceTraders = (state, payload) => {
  const spaceTraders = new SpaceTraders();
  spaceTraders.init(username, token);
  state.spaceTraders = spaceTraders;
};

const reducers = {
  // initializeSpaceTraders(
  //   state,
  //   { payload: { username, token } }
  // ): PayloadAction<{ username: string; token: string }>  {
  //   const spaceTraders = new SpaceTraders();
  //   spaceTraders.init(username, token);
  //   state.spaceTraders = spaceTraders;
  // },
};

const spaceTradersSlice = createSlice({
  name: 'spacetraders',
  initialState,
  reducers,
});

export const { initializeSpaceTraders } = spaceTradersSlice.actions;
export default spaceTradersSlice.reducer;
