const todoRouter = require('express').Router();
const todosController = require('../controllers/todosController');
const { authenticate } = require('../middlewares/authMiddleware');

todoRouter.get('/', authenticate, todosController.getAllTodos);

todoRouter.get('/:id', authenticate, todosController.getTodoById);

todoRouter.post('/', authenticate, todosController.createTodo);

todoRouter.patch('/:id', authenticate, todosController.updateTodo);

todoRouter.delete('/:id', authenticate, todosController.deleteTodo);


module.exports = todoRouter;