const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
let todos = [];
let uniId = 1;

// Create a todo

app.post("/todo/create", (req, res) => {
  const { todo } = req.body;

  todos.push({
    id: uniId,
    task: todo,
  });

  uniId++;

  res.send("Task created successfully!");
});

//  Delete all the todos

app.delete("/todo/delete/all", (req, res) => {
  todos.splice(0, todos.length);
  res.send("Todos deleted successfully");
});

// Delete todo with id

app.delete("/todo/delete/:uniId", (req, res) => {
  const id = String(req.params.uniId);
  todos = todos.filter((todo) => String(todo.id) !== id);

  res.json(todos);
});

// Update todo

app.put("/todo/update/:uniId", (req, res) => {
  const { updatedTodo } = req.body;
  const id = req.params.uniId.split(",").map(Number);

  const index = todos.findIndex((todo) => todo.id === id);

  todos[index].task = updatedTodo;

  res.json(todos);
});

// Update multiple todos

app.put("/todo/update-multiple", (req, res) => {
  const todosToUpdate = req.body;

  todosToUpdate.forEach((updateObj) => {
    const index = todos.findIndex((todo) => todo.id === updateObj.id);

    if (index !== -1) {
      todos[index].task = updateObj.task || todos[index].task;
    }
  });

  res.json({
    message: "Multiple todos updated successfully",
    todos,
  });
});

// Display todo list

app.get("/todo/list", (req, res) => {
  res.send(todos);
});

// Display todo with IDs

app.get("/todo/list/:uniId", (req, res) => {
  const ids = req.params.uniId.split(",").map(Number);
  todos = todos.filter((todo) => ids.includes(todo.id));
  res.send(todos);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/todo/list`);
});
