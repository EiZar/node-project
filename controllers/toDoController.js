var toDoService = require('../services/toDoService');

async function getAllToDos(req, res, next) {
    let todos = await toDoService.getAllToDos();
    console.log('Todo Routers get ', todos);
    console.log('request time is  ', req.requestTime);
    res.json(todos);
}

async function getAllCompletedToDos(req, res, next) {
    let todos = await toDoService.getAllCompletedToDos();
    console.log('Todo Routers get ', todos);
    console.log('request time is  ', req.requestTime);
    res.json(todos);
}

async function getTodoById(req, res, next) {
    try{
        let toDoId = req.params['id'];
        let todo = await toDoService.getToDoById(toDoId);
        if(!todo) res.status(400).json({error: 'ToDo not found'});
        res.json(todo);
    } catch(err) {
        res.status(404).json({error: 'ToDo not found'});
    }
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

async function updateTodo(req, res, next) {
    console.log('update todo ', req.body);
    try{
        const todoId = req.params['id'];
        const todo = await toDoService.updateToDo(todoId, req.body);
        if(!todo) throw Error('Cannot update todo');
        await res.json(todo); 
    } catch(err) {
        console.log(err);
        await res.status(400).json({error: 'Cannot update todo'});
    }
}

async function deleteTodo(req, res, next) {
    console.log('delete todo ', req.body);
    try{
        const todoId = req.params['id'];
        const todo = await toDoService.deleteToDo(todoId);
        if(!todo) throw Error('Cannot delete todo');
        await res.json(todo); 
    } catch(err) {
        console.log(err);
        await res.status(400).json({error: 'Cannot delete todo'});
    }
}

async function createTodo(req, res, next) {
    console.log('Todo Routers post ', req.body);
    try{
        const todo = await toDoService.saveToDo(req.body);
        if(!todo) throw Error('Cannot save todo');
        await res.status(201).json(todo); 
    } catch(err) {
        console.log(err);
        await res.status(400).json({message: err});
    }
    // res.send({
    //     id: 1,
    //     name: 'CSP'
    // });
}

module.exports = {
    getAllToDos,
    getAllCompletedToDos,
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