import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      // On garde toutes les tâches sauf celle qui a l'ID passé en payload
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;