var toDoService = require('../services/toDoService');

const handle = function(func, httpErrorCode) {
    return async function (req, res, next) {
        func(req, res, next)
        .catch(err => {
            return res.status(httpErrorCode).json({error: err})
        });
    }
}

async function getAllTodos(req, res, next) {
    let todos = await toDoService.getAllTodos();
    console.log('request time is  ', req.requestTime);
    res.json(todos);
}

async function getAllCompletedTodos(req, res, next) {
    let todos = await toDoService.getAllCompletedTodos();
    console.log('request time is  ', req.requestTime);
    res.json(todos);
}

async function getTodoByIdHandler(req, res, next) {
    let toDoId = req.params['id'];
    let todo = await toDoService.getTodoById(toDoId);
    if(!todo) throw Error('Todo not found!');
    await res.status(200).json(todo);
}

const getTodoById = function(req, res, next) {
    handle(getTodoByIdHandler, 404)(req, res, next);
}

async function updateTodoHandler(req, res, next) {
    const todoId = req.params['id'];
    const todo = await toDoService.updateTodo(todoId, req.body);
    if(!todo) throw Error('Cannot update todo');
    await res.json(todo); 
}

const updateTodo = function(req, res, next) {
    handle(updateTodoHandler, 400)(req, res, next);
}

async function deleteTodoHandler(req, res, next) {
    const todoId = req.params['id'];
    const todo = await toDoService.deleteTodo(todoId);
    if(!todo) throw Error('Cannot delete todo');
    await res.json(todo); 
}

const deleteTodo = function(req, res, next) {
    handle(deleteTodoHandler, 400)(req, res, next);
}

async function createTodoHandler(req, res, next) {
    const todo = await toDoService.saveTodo(req.body);
    if(!todo) throw Error('Cannot save todo');
    await res.status(201).json(todo); 
}

const createTodo = function(req, res, next) {
    handle(createTodoHandler, 400)(req, res, next);
}

function todoWildCard(req, res, next) {
    console.log('Todo ab+cd get router ');
    res.send({
        url: req.url
    });
}

function getByTodoIdAndTaskId(req, res, next) {
    console.log("Todo get by todoId  ", req.params['todoId'], " and taskId  ", req.params['taskId']);
    let toDoId = req.params['todoId'];
    let taskId = req.params['taskId'];
    res.send({
        url: req.url,
        todoId: toDoId,
        taskId: taskId
    })
}

function multipleRoute1(req, res, next) {
    console.log('multiple first route ');
    next(); //go to the next middleware
}

function multipleRoute2(req, res, next) {
    console.log('multiple second route ');
    res.send({
        route: 'multiple routes'
    });
}

function downloadFile(req, res, next) {
    console.log('download file');
    res.download('./public/images/bulbon.jpeg');
}

function responseEnd(req, res, next) {
    console.log('Response end ');
    res.status(401).end();
}

function responseRedirect(req, res, next) {
    console.log('Response redirect ');
    res.redirect('/api/todos');
}

module.exports = {
    getAllTodos,
    getAllCompletedTodos,
    getTodoById,
    todoWildCard,
    getByTodoIdAndTaskId,
    multipleRoute1,
    multipleRoute2,
    downloadFile,
    responseEnd,
    responseRedirect,
    updateTodo,
    deleteTodo,
    createTodo
}