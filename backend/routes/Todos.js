const express = require("express");
const Todo = require("../model/Todo");
const {
  createTodo,
  getTodosByUserId,
} = require("../controller/TodoController");

const router = express.Router();

router.post("/Btodo", createTodo);
router.get("/Btodos/:userId", getTodosByUserId);

module.exports = router;
