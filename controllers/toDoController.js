var toDoService = require('../services/toDoService');

function getAllToDos(req, res, next) {
    let todos = toDoService.getAllToDos();
    console.log('Todo Routers get ');
    console.log('request time is  ', req.requestTime);
    res.json(todos);
}

function getTodoById(req, res, next) {
    let toDoId = req.params['id'];
    let todo = toDoService.getToDoById(toDoId);
    res.send(todo);
};

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

function createTodo(req, res, next) {
    console.log('Todo Routers post ', req.body);
    res.send({
        id: 1,
        name: 'CSP'
    });
}

module.exports = {
    getAllToDos,
    getTodoById,
    todoWildCard,
    getByTodoIdAndTaskId,
    multipleRoute1,
    multipleRoute2,
    downloadFile,
    responseEnd,
    responseRedirect,
    createTodo
}