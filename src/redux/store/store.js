import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../slice/slice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
