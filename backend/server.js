const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express(); // make sure this comes BEFORE using it

const corsOptions = {
  origin: 'http://localhost:8000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

const {
    createTask,
    createTest,
    createSession,
    createProject,
    createProjectTask,
    generateSessionsForTest
  } = require('./models');

const PORT = 3000;
const path = require('path');
const DATA_FILE = path.join(__dirname, '../backend/backend_data/data.json');

// Reads data from the JSON file
const readData = () => {
    try {
        const rawData = fs.readFileSync(DATA_FILE);
        return JSON.parse(rawData || "{}");
    } catch (error) {
        console.error("❌ Error reading data.json:", error);
        return { tasks: [], users: [], brainstorm_notes: [] };
    }
};

// Writes data to the JSON file
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// GET users (list)
app.get('/users', (req, res) => {
    const data = readData();
    res.json(data.users);
});

// GET tasks (list)
app.get('/tasks', (req, res) => {
    const data = readData();
    res.json(data.tasks);
});

// POST task (create)
app.post('/tasks', (req, res) => {
    const data = readData();
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        deadline: req.body.deadline,
        completed: false
    };

    data.tasks.push(newTask);
    writeData(data);
    
    res.json({ message: "Task added successfully!", task: newTask });
});

// POST /tests
app.post('/tests', (req, res) => {
    const data = readData();
    const test = req.body;
    data.tests.push(test);
    writeData(data);
    res.status(200).json(test);
  });
  
// POST /sessions
app.post('/sessions', (req, res) => {
    const data = readData();
    const session = req.body;
    data.sessions.push(session);
    writeData(data);
    res.status(200).json(session);
});

// POST /projects
app.post('/projects', (req, res) => {
    const data = readData();
    const project = req.body;
    data.projects.push(project);
    writeData(data);
    res.status(200).json(project);
});

// PUT task (update)
app.put('/tasks/:id', (req, res) => {
    const data = readData();
    const task = data.tasks.find(t => t.id == req.params.id);

    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }

    task.title = req.body.title || task.title;
    task.deadline = req.body.deadline || task.deadline;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

    writeData(data);
    res.json({ message: "Task updated!", task });
});

// DELETE task (delete)
app.delete('/tasks/:id', (req, res) => {
    let data = readData();
    const tasksFiltrate = data.tasks.filter(t => t.id != req.params.id);

    if (data.tasks.length === tasksFiltrate.length) {
        return res.status(404).json({ error: "Task not found" });
    }

    data.tasks = tasksFiltrate;
    writeData(data);
    res.json({ message: "Task deleted successfully!" });
});


// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

// POST brainstorm note (create)
app.post('/brainstorm', (req, res) => {
    console.log("📥 Incoming body:", req.body); //test
    const data = readData();

    const newNote = {
        id: Date.now(),
        subject: req.body.subject || null,
        description: req.body.description || "",
        deadline: req.body.deadline || null,
        created_at: new Date().toISOString()
    };

    if (!data.brainstorm_notes) data.brainstorm_notes = [];
    data.brainstorm_notes.push(newNote);
    writeData(data);

    console.log("🧠 Note received:", newNote); // test

    // ✅ IMPORTANT: Return valid JSON!
    res.status(200).json({ message: "Note saved successfully", note: newNote });

});