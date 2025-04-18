const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;
const DATA_FILE = './backend_data/data.json';

// Reads data from the JSON file
const readData = () => {
    const rawData = fs.readFileSync(DATA_FILE);
    return JSON.parse(rawData);
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