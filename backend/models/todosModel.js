const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: String,
        required: true
    }
})


const Todos = mongoose.model('todos', todoSchema)

module.exports = Todos;