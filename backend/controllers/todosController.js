
const Todos = require('../models/todosModel')

exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todos.find();
        return res.status(200).send({ todos: todos });
    } catch (error) {
        console.error(`Error fetching all todos:`, error.message)
        return res.status(500).send({ error: `Error fetching all todos` })
    }
}

exports.getTodoById = async (req, res) => {
    const id = req.params.id;
    try {
        const todo = await Todos.findById(id);
        if (!todo) {
            return res.status(404).send({ error: 'Todo not found' })
        }
        return res.status(200).send({ todo: todo })
    } catch (error) {
        console.error('Error fetching todo:', error.message);
        return res.status(500).send({ error: 'Error fetching todo' })
    }
}


exports.createTodo = async (req, res) => {
    const title = req.body.title;
    try {
        const newTodo = new Todos({ title: title })
        const savedTodo = await newTodo.save();
        return res.status(201).send({ newTodo: savedTodo })
    } catch (error) {
        console.error('Error creating todo:', error.message)
        return res.status(400).send({ error: 'Error creating todo' })
    }
}

exports.updateTodo = async (req, res) => {
    const id = req.params.id
    try {
        const updatedTodo = await Todos.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedTodo) {
            return res.status(404).send({ error: 'Todo not found' });
        }
        return res.status(200).send({ updatedTodo: updatedTodo });
    } catch (error) {
        console.error('Error updating todo:', error.message);
        return res.status(400).send({ error: 'Error updating todo' });
    }
}

exports.deleteTodo = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTodo = await Todos.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).send({ error: 'Todo not found' });
        }
        return res.status(200).send({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error('Error deleting todo:', error.message);
        return res.status(500).send({ error: 'Error deleting todo' });
    }
}

/* exports.toggleTodo = async (req, res) => {
    const id = req.params.id;
    try {
        const toggledTodo = await Todos.findById(id);
        if (!toggledTodo) {
            return res.status(404).send({ error: 'Todo toggling unsuccessful' });
        }

        toggledTodo.completed = !toggledTodo.completed;
        await toggledTodo.save();

        return res.status(200).send({message: 'Todo toggled successfully',updatedTodo: toggledTodo});
    } catch (error) {
        console.error('Error toggling todo:', error.message);
        return res.status(500).send({ error: 'Error toggling todo' });
    }
}; */
