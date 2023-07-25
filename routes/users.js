var express = require('express');
var router = express.Router();
const users = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', users.registerUser);
router.post('/login', users.loginUser);

module.exports = router;
