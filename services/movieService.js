const { default: mongoose } = require('mongoose');
let Movie = require('../models/movie');

async function getAllMovies() {
    return Movie.find();
}

async function getMovieById(id) {
    return Movie.findById(id);
}

async function getMovieByTitle(title) {
    const movies = Movie.find({
        title: {
            $regex:title
        }
    });
    return movies;
}

async function createMovie(movie) {
    console.log("movie service create movie", movie);
    console.log("review body ", movie.review.body);
    console.log("movie director ", movie.director);
    const newMovie = new Movie({
        title: movie.title,
        director: mongoose.Types.ObjectId(movie.director),
        review: {
            rating: movie.review.rating,
            body: movie.review.body,
        },
        year: movie.year,
    });
    // const newMovie = new Movie(movie);
    console.log("movie service before save", newMovie);
    await newMovie.save();
    // return savedMovie.populate('Director');
    console.log("movie service after save", newMovie.populate('director'));
    return newMovie.populate('director');
}

async function updateMovie(id, movie) {
    const updateMovie = Movie.findByIdAndUpdate(id, movie, {new: true});
    return updateMovie;
}

async function deleteMovie(id) {
    const deleteMovie = Movie.findByIdAndDelete(id);
    return deleteMovie;
}

module.exports = {
    getAllMovies,
    getMovieById,
    getMovieByTitle,
    createMovie,
    updateMovie,
    deleteMovie
}