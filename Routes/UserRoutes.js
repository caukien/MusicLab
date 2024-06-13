const { UserController } = require('../Controllers/UserController');
const router = require('express').Router();


router.post('/account/register', UserController.Register)
router.post('/account/login', UserController.Login)

module.exports = router