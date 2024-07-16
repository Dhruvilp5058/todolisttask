import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push({ ...action.payload, done: false }); 
    },
    editTask: (state, action) => {
      const { id, title, date } = action.payload;
      const existingTask = state.find(task => task.id === id);
      if (existingTask) {
        existingTask.title = title;
        existingTask.date = date;
      }
    },
    deleteTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },
    markTaskDone: (state, action) => {
      const existingTask = state.find(task => task.id === action.payload);
      if (existingTask) {
        existingTask.done = !existingTask.done;
      }
    },
  },
});

export const { addTask, editTask, deleteTask, markTaskDone } = tasksSlice.actions;

export default tasksSlice.reducer;
