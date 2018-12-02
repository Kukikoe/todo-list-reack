import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import penImg from "../img/pen.svg";
import garbageImg from "../img/garbage.svg";

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            title: this.props.todoTitle
        };
        this.onEditing = this.onEditing.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    onEditing() {
        this.setState({editing: !this.state.editing});
    }

    onChangeState(event) {
        this.setState({title: event.target.value});
    }

    handleClick() {
        this.onEditing();
        return this.props.onUpdate(this.state.title, this.props.id);
    }

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
                                   onChange={() => this.props.onStatusChange(this.props.id)}
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
                            <div className="todo__delete-btn" onClick={() => this.props.onDelete(this.props.id)}>
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
    completed: PropTypes.bool.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default Todo;