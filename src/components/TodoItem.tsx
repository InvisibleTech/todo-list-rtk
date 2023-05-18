import { useCallback, useState } from 'react';

import { onEnterPress } from '../ui-helpers/on-enter';
import { TodoItem as TodoItemModel, removeTodo, toggleDone, updateText } from '../stores/todoReducer';
import { useAppDispatch } from '../stores/hooks';

export const TodoItem = (props: { todo: TodoItemModel }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState('');
  const dispatch = useAppDispatch();

  const { todo } = props;

  const handleUpdateText = useCallback(() => {
    dispatch(updateText({ id: todo.id, newText }));
    setIsEditing(false);
    setNewText('');
  }, [dispatch, todo.id, newText]);

  const handleToggleDone = useCallback(() => {
    dispatch(toggleDone(todo.id));
  }, [dispatch, todo.id]);

  const handleRemove = useCallback(() => {
    dispatch(removeTodo(todo.id));
  }, [dispatch, todo.id]);

  return (
    <div className="todo-item">
      {isEditing ? (
        <div>
          <input type="text" onKeyDown={onEnterPress(handleUpdateText)} onChange={(e) => setNewText(e.target.value)} />
          <button onClick={handleUpdateText}>save</button>
        </div>
      ) : (
        <div>
          <span>{todo.text}</span>
          <input type="checkbox" onChange={handleToggleDone} defaultChecked={todo.isDone}></input>
          <button onClick={() => setIsEditing(true)}>edit</button>
          <button onClick={handleRemove}>X</button>
        </div>
      )}
    </div>
  );
};
