import React, {Component} from 'react';
import './css/App.css';
import TodosStore from './store/store';
import TodoForm from './components/TodoForm.js';
import Todo from './components/Todo.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: TodosStore.getNewTodos()
        };
    }

    componentDidMount() {
        TodosStore.on("storeUpdated", this.updateTodo);
    }

    updateTodo = () => {
        this.setState({todos: TodosStore.getNewTodos()});
    };

    render() {
        return (
            <div className="todos">
                <div className="todos__header">
                    <div className="todos__title">
                        Todo List React
                    </div>
                </div>
                <div className="todos__list">
                    {this.state.todos.map(todo => {
                        return <Todo
                                    key={todo.id}
                                    id={todo.id}
                                    todoTitle={todo.title}
                                    completed={todo.completed}
                                />
                    })}
                </div>
                <TodoForm/>
            </div>
        );
    }
}

export default App;
