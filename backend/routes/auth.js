const authRouter = require('express').Router();
const authController = require('../controllers/authController');
const { authLimiter } = require('../middlewares/rateLimiterMiddleware');

authRouter.post('/signup', authController.signup);

authRouter.post('/login', authController.login);

module.exports = authRouter;