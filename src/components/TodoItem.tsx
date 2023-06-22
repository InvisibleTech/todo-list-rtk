import { useCallback, useState } from 'react';

import { onEnterPress } from '../ui-helpers/on-enter';
import {
  TodoItem as TodoItemModel,
  letsNotDoThatAgain,
  removeTodo,
  thatWasFun,
  updateText,
  wouldRatherHaveDoneSomethingElse,
} from '../stores/todoReducer';
import { useAppDispatch } from '../stores/hooks';
import { SiHappycow } from 'react-icons/si';
import { ImSad, ImNeutral2 } from 'react-icons/im';

export const TodoItem = (props: { todo: TodoItemModel }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState('');
  const dispatch = useAppDispatch();

  const { todo } = props;

  // TODO: research are these useCallbacks justified?
  const handleUpdateText = useCallback(() => {
    dispatch(updateText({ id: todo.id, newText }));
    setIsEditing(false);
    setNewText('');
  }, [dispatch, todo.id, newText]);

  const handleThatWasFun = useCallback(() => {
    dispatch(thatWasFun(todo.id));
  }, [dispatch, todo.id]);

  const handleWouldRatherHaveDoneSomethingElse = useCallback(() => {
    dispatch(wouldRatherHaveDoneSomethingElse(todo.id));
  }, [dispatch, todo.id]);

  const handleLetsNotDoThatAgain = useCallback(() => {
    dispatch(letsNotDoThatAgain(todo.id));
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
          <button disabled={todo.isDone} onClick={handleThatWasFun}>
            <SiHappycow color={todo.fun === 'yes' ? 'green' : undefined} />
          </button>
          <button disabled={todo.isDone} onClick={handleWouldRatherHaveDoneSomethingElse}>
            <ImNeutral2 color={todo.fun === 'meh' ? 'green' : undefined} />
          </button>
          <button disabled={todo.isDone} onClick={handleLetsNotDoThatAgain}>
            <ImSad color={todo.fun === 'no' ? 'green' : undefined} />
          </button>
          <button onClick={() => setIsEditing(true)} disabled={todo.isDone}>
            edit
          </button>
          <button onClick={handleRemove}>X</button>
        </div>
      )}
    </div>
  );
};
