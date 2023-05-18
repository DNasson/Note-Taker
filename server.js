// dependencies
const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');

// create app and set port
const app = express();
const PORT = 3001;

// data parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// create listener
app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`))