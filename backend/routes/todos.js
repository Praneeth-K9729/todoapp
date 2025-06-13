const todoRouter = require('express').Router();
const todosController = require('../controllers/todosController');
const { authenticate } = require('../middlewares/authMiddleware');

todoRouter.get('/', authenticate, todosController.getAllTodos);

todoRouter.get('/:id', todosController.getTodoById);

todoRouter.post('/', todosController.createTodo);

todoRouter.patch('/:id', todosController.updateTodo);

todoRouter.delete('/:id', todosController.deleteTodo);

//todoRouter.patch('/toggle/:id', todosController.toggleTodo);

module.exports = todoRouter;