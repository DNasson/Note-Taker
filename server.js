// label variables
const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', htmlRoutes);
app.use('/notes', htmlRoutes);

app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`))