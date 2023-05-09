// GET /notes = notes.html
// GET * = index.html

// GET /api/notes = db.json

// POST /api/notes = db.json

const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.static('public'));

app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`))