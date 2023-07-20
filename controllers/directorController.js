let directorService = require('../services/directorService');

const handle = function(func, httpErrorCode) {
    return async function (req, res, next) {
        func(req, res, next)
        .catch(err => {
            return res.status(httpErrorCode).json({error: err})
        });
    }
}

async function getAllDirectorsHandler (req, res, next) {
    const directors = await directorService.getAllDirectors();
    res.json(directors);
}

const getAllDirectors = function(req, res, next) {
    handle(getAllDirectorsHandler, 404)(req, res, next);
}

async function getDirectorByIdHandler (req, res, next) {
    let directorId = req.params['id'];
    const director = await directorService.getDirectorById(directorId);
    res.json(director);
}

const getDirectorById = function(req, res, next) {
    handle(getDirectorByIdHandler, 404)(req, res, next);
}

async function createDirectorHandler (req, res, next) {
    let director = req.body;
    const newDirector = await directorService.createDirector(director);
    res.json(newDirector);
}

const createDirector = function(req, res, next) {
    handle(createDirectorHandler, 400)(req, res, next);
}

async function updateDirectorHandler (req, res, next) {
    let directorId = req.params['id'];
    let director = req.body;
    const updateDirector = await directorService.updateDirector(directorId, director);
    res.json(updateDirector);
}

const updateDirector = function(req, res, next) {
    handle(updateDirectorHandler, 400)(req, res, next);
}

async function deleteDirectorHandler (req, res, next) {
    let directorId = req.params['id'];
    const deleteDirector = await directorService.deleteDirector(directorId);
    res.json(deleteDirector);
}

const deleteDirector = function(req, res, next) {
    handle(deleteDirectorHandler, 400)(req, res, next);
}

module.exports = {
    getAllDirectors,
    getDirectorById,
    createDirector,
    updateDirector, 
    deleteDirector
}