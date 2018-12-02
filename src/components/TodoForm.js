import React, {Component} from 'react';
import PropTypes from "prop-types";

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoTitle: ""
        };
        this.onChangeState = this.onChangeState.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChangeState(event) {
        this.setState({todoTitle: event.target.value});
    }

    handleSubmit() {
        this.setState({ todoTitle: "" });
        return this.props.onAdd(this.state.todoTitle);
    }

    render() {
        return (
            <div className="todos__form">
                <input className="input" onChange={this.onChangeState} value={this.state.todoTitle}></input>
                <button className="add-btn" onClick={this.handleSubmit}>add</button>
            </div>

        );
    }
}

TodoForm.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default TodoForm;
