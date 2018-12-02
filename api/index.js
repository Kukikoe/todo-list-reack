const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

let todos = JSON.parse(fs.readFileSync('./api/todos.json', 'utf-8'));

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/todos', (req, res) => {
    console.log("in get")
    res.send(todos);
});

app.post('/api/todos', (req, res) => {
    let todo = {
        id: todos[todos.length - 1].id + 1,
        title: req.body.title,
        completed: false
    };

    todos.push(todo);
    fs.writeFileSync('./api/todos.json', JSON.stringify(todos, null, 2));
    res.send(todos);
});

app.put('/api/todos', (req, res) => {
    todos = todos.map(todo => {
        if (todo.id === req.body.id) {
            todo.title = req.body.title;
        }
        return todo;
    });

    if (!todos) return res.sendStatus(404);
    fs.writeFileSync('./api/todos.json', JSON.stringify(todos, null, 2));
    res.send(todos);
});

app.patch('/api/todos', (req, res) => {
    todos = todos.map(todo => {
        if (todo.id === req.body.id) {
            todo.completed = !todo.completed;
        }
        return todo;
    });

    if (!todos) return res.sendStatus(404);
    fs.writeFileSync('./api/todos.json', JSON.stringify(todos, null, 2));
    res.send(todos);
});

app.delete('/api/todos', (req, res) => {
    todos = todos.filter(todo => todo.id !== req.body.id);

    if (!todos) return res.sendStatus(404);
    fs.writeFileSync('./api/todos.json', JSON.stringify(todos, null, 2));
    res.send(todos);
});

app.listen(5000,  () => console.log(`Server is listening: http://localhost:5000`));