// dependencies
const router = require("express").Router();
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils.js");
const path = require("path");
const uuid = require("../helpers/uuid.js");   

// GET Route for retrieving all the notes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));    }
);

// Delete notes route
router.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id; // Update variable name to 'id'

  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId); // Update property name to 'id'

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

// POST Route for a new note
router.post("/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
        title,
        text,
        id: uuid(),
    };
    readAndAppend(newNote, path.join(__dirname, '../db/db.json'));
    res.json("Note added successfully");
  } else {
    res.error("Error in adding note");
  }
});





module.exports = router;
