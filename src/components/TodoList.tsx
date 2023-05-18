import { TodoItem } from './TodoItem';
import { useAppSelector } from '../stores/hooks';

export const TodoList = () => {
  const openTodos = useAppSelector((state) => {
    return state.todos.list.filter((t) => t.isDone === false);
  });

  const finishedTodos = useAppSelector((state) => {
    return state.todos.list.filter((t) => t.isDone === true);
  });

  return (
    <div className="todo-list">
      <div className="open-todos">
        <span>Open Todos</span>
        {openTodos.map((todo) => (
          <TodoItem key={`${todo.id}-${todo.text}`} todo={todo} />
        ))}
      </div>
      <div className="finished-todos">
        <span>Finished Todos</span>
        {finishedTodos.map((todo) => (
          <TodoItem key={`${todo.id}-${todo.text}`} todo={todo} />
        ))}
      </div>
    </div>
  );
};
