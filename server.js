const express = require('express');
const app = express();
const port = 3000;

// Enable JSON body parsing middleware
app.use(express.json());


// In-memory data store
let tasks = [
  { id: 1, title: "Review system architecture", done: false },
  { id: 2, title: "Setup Express boilerplate", done: true },
  { id: 3, title: "Write API documentation", done: false }
];

// Helper to get next available ID
let nextId = 4;

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

// POST new task
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  // Validation: title must exist and not be empty string
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: "Title is required and cannot be empty" });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    done: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});