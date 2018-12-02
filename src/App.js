import React, {Component} from 'react';
import axios from 'axios';

import './css/App.css';
import TodoForm from './components/TodoForm.js';
import Todo from './components/Todo.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/todos')
            .then(response => response.data)
            .then(todos => this.setState({ todos }))
            .catch(error => console.error(error.message));
    }

    handleStatusChange(id) {
        axios.patch('http://localhost:3000/api/todos', {id})
            .then(response =>  response.data)
            .then(todos => this.setState({ todos }))
            .catch(error => console.error(error.message));
    }

    handleDelete(id) {
        axios.delete('http://localhost:3000/api/todos', {data: { id: id }})
            .then(response =>  response.data)
            .then(todos => this.setState({ todos }))
            .catch(error => console.error(error.message));
    }

    handleAdd(title) {
        if (title) {
            axios.post('http://localhost:3000/api/todos', {title})
                .then(response =>  response.data)
                .then(todos => this.setState({ todos }))
                .catch(error => console.error(error.message));        }
    }

    handleUpdate(title, id) {
        axios.put('http://localhost:3000/api/todos', {id, title})
            .then(response =>  response.data)
            .then(todos => this.setState({ todos }))
            .catch(error => console.error(error.message));
    }

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
                                    onStatusChange={this.handleStatusChange}
                                    onDelete={this.handleDelete}
                                    onUpdate={this.handleUpdate}
                                />
                    })}
                </div>
                <TodoForm onAdd={this.handleAdd}/>
            </div>
        );
    }
}

export default App;
