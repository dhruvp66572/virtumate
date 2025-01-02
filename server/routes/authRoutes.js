const {Router} = require('express');

const authController = require('../controllers/authController');

const router = Router();

router.get('/', authController.check);

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/getalluser', authController.getAllUser);

router.get('/getoneuser')

module.exports = router;