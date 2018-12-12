import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import penImg from "../img/pen.svg";
import garbageImg from "../img/garbage.svg";
import * as TodoActions from "../actions/action";

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            title: this.props.todoTitle
        };
    }

    onEditing = () => {
        this.setState({editing: !this.state.editing});
    };

    change = () => {
        TodoActions.chandeStatusOfTodo(this.props.id);
    };

    onChangeState = (event) => {
        this.setState({title: event.target.value});
    };

    handleClick = () => {
        TodoActions.updateTodo(this.props.id, this.state.title);
        this.onEditing();
    };

    deleteTodo = () => {
        TodoActions.deleteTodo(this.props.id);
    };

    render() {
        return (
            <div className="todo">
                {this.state.editing
                    ?
                    <div className="todo__edit">
                        <input type="text" className="todo__input" value={this.state.title} onChange={this.onChangeState}/>
                        <button className="todo__update-btn" onClick={this.handleClick}>Update</button>
                    </div>
                    :
                    <div className="todo__info">
                        <label className="todo__checkbox">
                            <input type="checkbox"
                                   className="todo__checkbox-input"
                                   checked={this.props.completed}
                                   onChange={this.change}
                            />
                            <span className="todo__checkmark"></span>
                        </label>
                        <div className={`todo__title${this.props.completed ? '_completed' : ''}`}>
                            {this.props.todoTitle}
                        </div>
                        <div className="todo__btns">
                            <div className="todo__change-btn" onClick={this.onEditing}>
                                <img alt="" src={penImg} className="todo__icon-img"/>
                            </div>
                            <div className="todo__delete-btn" onClick={this.deleteTodo}>
                                <img alt="" src={garbageImg} className="todo__icon-img"/>
                            </div>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

Todo.propTypes = {
    todoTitle: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
};

export default Todo;