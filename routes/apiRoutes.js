const express = require('express');
const router = require('express').Router();
const fs = require('fs');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils.js');
const DB = require('../db/db.json');

router.get("/api/notes", (req, res) => {
   console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  router.post("/api/notes", (req, res) => {
    console.info(`${req.method} request received to add a note`);
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
        };
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {    
        res.error('Error in adding note');
    }

  });

  router.delete("/api/notes/:id", async function (req, res) {
    // separates out the note to delete based on id
    const noteToDelete = req.params.id;
    // notes already in json file
    const currentNotes = await DB.readNotes();
    // sort through notes file and create a new array minus the note in question
    const newNoteData = currentNotes.filter((note) => note.id !== noteToDelete);
  
    // sends the new array back the DB class 
    await DB.deleteNote(newNoteData);
    
    return res.send(newNoteData);
  });

module.exports = router;