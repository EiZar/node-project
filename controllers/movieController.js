var movieService = require('../services/movieService');

const handle = function(func, httpErrorCode) {
    return async function (req, res, next) {
        try{
            func(req, res, next)
            .catch(err => {
                return res.status(httpErrorCode).json({error: err})
            });
        } catch(err) {
            console.log("Error is ",err);
            await res.status(httpErrorCode).json({message: err})
        }
    }
}

async function getAllMoviesHandler (req, res, next) {
    const movies = await movieService.getAllMovies();
    res.json(movies);
}

const getAllMovies = function(req, res, next) {
    handle(getAllMoviesHandler, 404)(req, res, next);
}

async function getMovieByIdHandler (req, res, next) {
    let movieId = req.params['id'];
    const movie = await movieService.getMovieById(movieId);
    res.json(movie);
}

const getMovieById = function(req, res, next) {
    handle(getMovieByIdHandler, 404)(req, res, next);
}

async function createMovieHandler (req, res, next) {
    const newMovie = await movieService.createMovie(req.body);
    console.log("movie controller after create");
    res.status(201).json(newMovie);
}

const createMovie = function(req, res, next) {
    console.log("movie controller create movie");
    handle(createMovieHandler, 400)(req, res, next);
}

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie
}