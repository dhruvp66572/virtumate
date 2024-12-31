const {Router} = require('express');

const authController = require('../controllers/authController');

const router = Router();

router.get('/', authController.check);

router.post('/register', authController.register);

router.post('/login', authController.login);

module.exports = router;