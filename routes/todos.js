var express = require("express");
var router = express.Router();
const todos = require('../controllers/toDoController');

router.get('/', todos.getAllTodos);
router.get('/completed', todos.getAllCompletedTodos);
router.get('/:id', todos.getTodoById);
router.get('/:todoId/task/:taskId', todos.getByTodoIdAndTaskId);

//multiple routes
router.get('/multiple/routes', todos.multipleRoute1);
router.get('/multiple/routes', todos.multipleRoute2);

//route for http://localhost:3000/todos/abbbbbbbcd 
//b must be one or more because it is using RegExr
router.get('/reg/ab+cd', todos.todoWildCard);
//download file
router.get('/download/file', todos.downloadFile);
//end with status
router.get('/response/end', todos.responseEnd);
//redirect
router.get('/response/redirect', todos.responseRedirect);

router.put('/:id', todos.updateTodo);
router.delete('/:id', todos.deleteTodo);
router.post('/', todos.createTodo);

module.exports = router;
