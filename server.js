const express = require('express');
const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});