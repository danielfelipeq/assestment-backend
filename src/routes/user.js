const router = require('express').Router();
const userController = require('../controllers/user.controller');

// login user
router.route('/login').post(userController.login);
// register user
router.route('/register').post(userController.register);

module.exports = router;
