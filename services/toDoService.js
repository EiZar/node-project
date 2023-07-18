let Todo = require('../models/toDo');

async function getAllToDos () {
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

async function getAllCompletedToDos(){
    return Todo.find({
        completed: true
    });
}

async function getToDoById (id) {
    let todo = await Todo.findById(id);
    return todo;
    // return {
    //     id: id,
    //     title: 'Task 1' 
    // }; // important not to miss the semicoma
}

async function updateToDo(id, todo) {
    const updateToDo = Todo.findByIdAndUpdate(id, todo, {new: true});
    return updateToDo;
}

async function deleteToDo(id) {
    const deletedToDo = Todo.findByIdAndDelete(id);
    return deletedToDo;
}

async function saveToDo(todo) {
    console.log("save todo service ");
    const newToDo = new Todo(todo);
    return newToDo.save();
}

module.exports = {
    getAllToDos,
    getAllCompletedToDos,
    getToDoById,
    updateToDo,
    deleteToDo,
    saveToDo
}