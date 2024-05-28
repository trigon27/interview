// models/Todo.js
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false, // Default value is false, indicating the todo is not completed
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
