let Director = require('../models/director');

async function getAllDirectors() {
    return Director.find();
}

async function getDirectorById(id) {
    return Director.findById(id);
}

async function createDirector(director) {
    const newDirector = new Director(director);
    return newDirector.save();
}

async function updateDirector(id, director) {
    return Director.findByIdAndUpdate(id, director, {new: true});
}

async function deleteDirector(id) {
    return Director.findByIdAndDelete(id);
}

module.exports = {
    getAllDirectors,
    getDirectorById,
    createDirector,
    updateDirector,
    deleteDirector
}