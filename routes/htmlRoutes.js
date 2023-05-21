// dependencies
const express = require('express');
const router = require('express').Router();
const path = require('path');

// get route for retrieving notes page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));    }
);

// get route for retrieving index page
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
    }
);

module.exports = router;    