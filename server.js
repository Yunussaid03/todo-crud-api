const express = require('express');
const app = express();
const port = 3000;


// In-memory data store
let tasks = [
  { id: 1, title: "Review system architecture", done: false },
  { id: 2, title: "Setup Express boilerplate", done: true },
  { id: 3, title: "Write API documentation", done: false }
];

//Root Endpoint: API metadata
app.get('/', (req, res) => {
    res.status(200).json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    });
});

//Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: "ok"
    });
});

// GET all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// GET single task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: `Task ${taskId} not found` });
  }

  res.status(200).json(task);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});