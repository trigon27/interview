// controllers/todoController.js
const Todo = require("../model/Todo");

exports.createTodo = async (req, res) => {
  const { userId, date, task } = req.body;

  // Convert the date string to a JavaScript Date object
  const formattedDate = new Date(date);

  // Create a new todo item associated with the user ID
  const newTodo = new Todo({
    userId,
    date: formattedDate,
    task,
  });

  try {
    // Save the todo item to the database
    await newTodo.save();
    const todoData = newTodo.toObject();

    // Send a response with the saved todo item
    res
      .status(201)
      .json({ message: "Todo created successfully", todo: todoData });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.getTodosByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find all todos associated with the user ID
    const todos = await Todo.find({ userId });

    res.status(200).json({ todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Server error" });
  }
};
