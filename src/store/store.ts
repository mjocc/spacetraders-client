import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import localForage from 'localforage';
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
import authReducer from './slices/auth';
import commandHistoryReducer from './slices/commandHistory';
import outcomeToastsReducer from './slices/outcomeToasts';
import { spaceTradersApi } from './slices/spaceTraders/api';

const persistConfig = {
  key: 'root',
  whitelist: ['auth', 'commandHistory'],
  version: 1,
  storage: process.env.NEXT_PUBLIC_USE_LOCALFORAGE ? localForage : storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  outcomeToasts: outcomeToastsReducer,
  commandHistory: commandHistoryReducer,
  [spaceTradersApi.reducerPath]: spaceTradersApi.reducer,
});
const reducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(spaceTradersApi.middleware),
});

setupListeners(store.dispatch);

export default store;
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
