import React, {Component} from 'react';
import * as TodoActions from "../actions/action";

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoTitle: ""
        };
    }

    onChangeState = (event) => {
        this.setState({todoTitle: event.target.value});
    };

    handleSubmit = () => {
        this.setState({ todoTitle: "" });
        TodoActions.addTodo(this.state.todoTitle);
    };

    render() {
        return (
            <div className="todos__form">
                <input className="input" onChange={this.onChangeState} value={this.state.todoTitle}></input>
                <button className="add-btn" onClick={this.handleSubmit}>add</button>
            </div>

        );
    }
}

export default TodoForm;
