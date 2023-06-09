import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface TodoItem {
  id: number;
  text: string;
  isDone: boolean;
}

export interface TodoList {
  list: TodoItem[];
}

const initialState = {
  list: [
    {
      id: Date.now(),
      text: 'Turn the beat around',
      isDone: false,
    },
  ] as TodoItem[],
} as TodoList;

export const tasksSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTask = {
        id: Date.now(),
        text: action.payload,
        isDone: false,
      };
      state.list.push(newTask);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
      return state;
    },
    toggleDone: (state, action: PayloadAction<number>) => {
      const index = state.list.findIndex((t) => t.id === action.payload);
      if (index !== -1) {
        state.list[index].isDone = !state.list[index].isDone;
      }
      return state;
    },
    updateText: (state, action: PayloadAction<{ id: number; newText: string }>) => {
      const index = state.list.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.list[index].text = action.payload.newText;
      }
      return state;
    },
  },
});

export const { addTodo, removeTodo, toggleDone, updateText } = tasksSlice.actions;

export default tasksSlice.reducer;
