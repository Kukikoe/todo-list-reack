import dispatcher from "../dispatcher";

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const CHANGE_STATUS_TODO = 'CHANGE_STATUS_TODO';

let nextTodoId = 0;

export function addTodo(title) {
    dispatcher.dispatch({
        type: ADD_TODO,
        id: nextTodoId++,
        value: title
    })
}

export function deleteTodo(id) {
    dispatcher.dispatch({
        type: DELETE_TODO,
        id: id
    })
}

export function updateTodo(id, title) {
    dispatcher.dispatch({
        type: UPDATE_TODO,
        id: id,
        value: title
    })
}

export function chandeStatusOfTodo(id) {
    dispatcher.dispatch({
        type: CHANGE_STATUS_TODO,
        id: id
    })
}