import { configureStore } from '@reduxjs/toolkit';
import spaceTradersReducer from './slices/spaceTraders';

const store = configureStore({
  reducer: {
    spaceTraders: spaceTradersReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
