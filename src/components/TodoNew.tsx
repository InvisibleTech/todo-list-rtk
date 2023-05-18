import { useCallback, useState } from 'react';
import { onEnterPress } from '../ui-helpers/on-enter';
import { useAppDispatch } from '../stores/hooks';
import { addTodo } from '../stores/todoReducer';

export const TodoNew = () => {
  const [newTodo, setNewTodo] = useState('');
  const dispatch = useAppDispatch();

  const handleAddTodo = useCallback(() => {
    dispatch(addTodo(newTodo));
    setNewTodo('');
  }, [dispatch, newTodo]);

  return (
    <div className="todo-new">
      <input
        type="text"
        value={newTodo}
        onKeyDown={onEnterPress(handleAddTodo)}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
};
