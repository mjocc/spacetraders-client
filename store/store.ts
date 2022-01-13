import { configureStore } from '@reduxjs/toolkit';
import spaceTradersReducer from './slices/spaceTraders';

const store = configureStore({
  reducer: {
    spaceTraders: spaceTradersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
