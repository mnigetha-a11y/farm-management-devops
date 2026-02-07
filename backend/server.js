const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001; // Neenga index.html-la kudutha adhe port 3001

// Middleware
app.use(cors()); // Vera vera port-la irunthu data vara idhu mukkiyam
app.use(bodyParser.json());

// Data store panna JSON file path
const DATA_FILE = path.join(__dirname, 'farmData.json');

// File illaina pudhu empty array oda create pannum
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// --- API Endpoints ---

// 1. All data-vai fetch panna (GET)
app.get('/api/crops', (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE));
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Data-va read panna mudiyala" });
    }
});

// 2. Pudhu crop details-a save panna (POST)
app.post('/api/crops', (req, res) => {
    const newCrop = req.body;
    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE));
        data.push(newCrop);
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        res.status(201).json({ message: "Data saved successfully on port 3001!" });
    } catch (err) {
        res.status(500).json({ error: "Data-va save panna mudiyala" });
    }
});

// 3. Data-va delete panna (DELETE)
app.delete('/api/crops/:index', (req, res) => {
    const index = parseInt(req.params.index);
    try {
        let data = JSON.parse(fs.readFileSync(DATA_FILE));
        if (index >= 0 && index < data.length) {
            data.splice(index, 1);
            fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
            res.json({ message: "Deleted successfully" });
        } else {
            res.status(404).json({ error: "Record kidaikala" });
        }
    } catch (err) {
        res.status(500).json({ error: "Delete panna mudiyala" });
    }
});

// Server Start
app.listen(PORT, () => {
    console.log(`----------------------------------------`);
    console.log(`✅ Backend Server is now live on Port: ${PORT}`);
    console.log(`🔗 Local URL: http://localhost:${PORT}`);
    console.log(`----------------------------------------`);
});