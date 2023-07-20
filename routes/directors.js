var express = require('express');
var router = express.Router();
let director = require('../controllers/directorController');

router.get('/', director.getAllDirectors);
router.get('/:id', director.getDirectorById);
router.post('/', director.createDirector);
router.put('/:id', director.updateDirector);
router.delete('/:id', director.deleteDirector)

module.exports = router;