import { configureStore } from '@reduxjs/toolkit';
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
import authReducer from './slices/auth';
import commandHistoryReducer from './slices/commandHistory';
import outcomeToastsReducer from './slices/outcomeToasts';

const persistConfig = {
  key: 'root',
  blacklist: ['outcomeToasts'],
  version: 1,
  storage: localForage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  outcomeToasts: outcomeToastsReducer,
  commandHistory: commandHistoryReducer,
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
