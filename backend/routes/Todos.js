const express = require("express");
const Todo = require("../model/Todo");
const {
  createTodo,
  getTodosByUserId,
  updateTodoStatus,
} = require("../controller/TodoController");

const router = express.Router();

router.post("/Btodo", createTodo);
router.get("/Btodos/:userId", getTodosByUserId);
router.put("/BupdateTodoStatus/:id", updateTodoStatus);

module.exports = router;
