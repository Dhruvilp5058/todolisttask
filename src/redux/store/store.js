import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import tasksReducer from '../slice/slice';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
