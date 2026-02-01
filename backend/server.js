const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());

// Intha route irundha thaan /api/status work aagum
app.get('/api/status', (req, res) => {
    res.json({ 
        message: "Node.js Backend connected successfully!", 
        status: "Running on Port 4000" 
    });
});

// Default route for localhost:4000
app.get('/', (req, res) => {
    res.send("Backend is working! Try /api/status for JSON output.");
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
