const express = require('express');
const path = require('path');
const index = require('./public/index.html');
const notes = require('./public/notes.html');
const db = require('./db/db.json');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/notes', (req, res) => res.json(notes));
app.get('*', (req, res) => res.json(index));

app.get('/api/notes', (req, res) => res.json(db.json));
app.post('/api/notes', (req, res) => res.json(db.json));



app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`))