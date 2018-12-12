import dispatcher from "../dispatcher";
import {EventEmitter} from "events";
import * as TodoActions from "../actions/action";

class TodosStore extends EventEmitter {
    constructor() {
        super();
        this.todos = [];
    }

    handleActions(action) {
        switch (action.type) {
            case TodoActions.ADD_TODO: {
                let todo = {
                    id: action.id,
                    title: action.value,
                    completed: false
                };
                this.todos.push(todo);
                this.emit("storeUpdated");
                break;
            }
            case TodoActions.DELETE_TODO: {
                this.todos = this.todos.filter(todo => todo.id !== action.id);
                this.emit("storeUpdated");
                break;
            }
            case TodoActions.UPDATE_TODO: {
                this.todos.map(todo => {
                    if (todo.id === action.id) {
                        todo.title = action.value;
                    }
                    return todo;
                });
                this.emit("storeUpdated");
                break;
            }
            case TodoActions.CHANGE_STATUS_TODO: {
                this.todos.map(todo => {
                    if (todo.id === action.id) {
                        todo.completed = !todo.completed;
                    }
                    return todo;
                });
                this.emit("storeUpdated");
                break;
            }
            default: {
            }
        }
    }

    getNewTodos() {
        return this.todos;
    }
}

const todosStore = new TodosStore();
dispatcher.register(todosStore.handleActions.bind(todosStore));
export default todosStore;