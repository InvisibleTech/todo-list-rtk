import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './todoReducer';

const store = configureStore({
  reducer: {
    todos: taskReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {todos: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
