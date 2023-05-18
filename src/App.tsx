import { TodoList } from './components/TodoList';
import { TodoNew } from './components/TodoNew';

function App() {
  return (
    <div className="App">
      <TodoNew />
      <TodoList />
    </div>
  );
}

export default App;
