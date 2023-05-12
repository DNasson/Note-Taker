const router = require('express').Router();
const path = require('path');   
const { readFromFile, readAndAppend } = require('../helpers/fsUtils.js');

router.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('db/db.json').then((data) => res.json(JSON.parse(data)));
    })
router.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) { 
        const newNote = {
            title,
            text,
        };

        readAndAppend(newNote, 'db/db.json');

        const response = {
            status: 'success',

            body: newNote,
        };

        res.json(response);
    } else {
      res.json('Error in posting feedback');
    }
});

module.exports = router;