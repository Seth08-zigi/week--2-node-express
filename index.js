const express = require("express");
const app = express();

app.use(express.json());

let todos = [
  { id: 1, task: "Study JavaScript", completed: false },
  { id: 2, task: "Do assignment", completed: true }
];

// GET all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// GET active todos
// IMPORTANT: this must come before /todos/:id
app.get("/todos/active", (req, res) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  res.json(activeTodos);
});

// GET single todo by id
app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found"
    });
  }

  res.json(todo);
});

// POST create todo
app.post("/todos", (req, res) => {
  const { task } = req.body;

  // validation
  if (!task || task.trim() === "") {
    return res.status(400).json({
      message: "Task field is required"
    });
  }

  const newTodo = {
    id: todos.length + 1,
    task: task,
    completed: false
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// PUT update todo
app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      message: "Todo not found"
    });
  }

  if (req.body.task !== undefined) {
    todo.task = req.body.task;
  }

  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed;
  }

  res.json(todo);
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      message: "Todo not found"
    });
  }

  todos.splice(todoIndex, 1);

  res.json({
    message: "Todo deleted successfully"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});