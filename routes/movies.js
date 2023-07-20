var express = require('express');
var router = express.Router();
const movie = require('../controllers/movieController');

router.get('/', movie.getAllMovies);
router.post('/', movie.createMovie);

module.exports = router;