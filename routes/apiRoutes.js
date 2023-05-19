const router = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils.js");
const path = require("path");
const uuid = require("../helpers/uuid.js");   

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));    }
);

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
