import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import spaceTradersReducer from './slices/spaceTraders';
import outcomeToastsReducer from './slices/outcomeToasts';

const persistConfig = {
  key: 'auth',
  whitelist: ['spaceTraders'],
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  spaceTraders: spaceTradersReducer,
  outcomeToasts: outcomeToastsReducer,
});
const reducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
