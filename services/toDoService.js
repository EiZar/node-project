// let Todo = require('../models/toDo');

function getAllToDos () {
    return [{
        id: 1,
        name: 'CSP'
    },
    {
        id: 2,
        name: 'EZP'
    }];
}

function getToDoById (id) {
    console.log("todo service    ....... ");
    return {
        id: id,
        title: 'Task 1' 
    };
}

module.exports = {
    getAllToDos,
    getToDoById
}