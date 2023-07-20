let Todo = require('../models/toDo');

async function getAllTodos () {
    return Todo.find();
    // return [{
    //     id: 1,
    //     name: 'CSP'
    // },
    // {
    //     id: 2,
    //     name: 'EZP'
    // }];
}

async function getAllCompletedTodos(){
    return Todo.find({
        completed: true
    });
}

async function getTodoById (id) {
    let todo = await Todo.findById(id);
    return todo;
    // return {
    //     id: id,
    //     title: 'Task 1' 
    // }; // important not to miss the semicoma
}

async function updateTodo(id, todo) {
    const updateToDo = Todo.findByIdAndUpdate(id, todo, {new: true});
    return updateToDo;
}

async function deleteTodo(id) {
    const deletedToDo = Todo.findByIdAndDelete(id);
    return deletedToDo;
}

async function saveTodo(todo) {
    console.log("save todo service ");
    const newToDo = new Todo(todo);
    return newToDo.save();
}

module.exports = {
    getAllTodos,
    getAllCompletedTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    saveTodo
}