const express = require('express');
const index = require('./public/index.html');
const notes = require('./public/notes.html');
const db = require('./db/db.json');

const app = express();
const PORT = 3001;

// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/notes', (req, res) => res.json(notes));
app.get('*', (req, res) => res.json(index));

app.get('/api/notes', (req, res) => res.json(db));

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (title && text) { 
        const newNote = {
            title,
            text,
        };

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    }
});
// POST request to add a review
// app.post('/api/reviews', (req, res) => {
//     // Log that a POST request was received
//     console.info(`${req.method} request received to add a review`);
  
//     // Destructuring assignment for the items in req.body
//     const { product, review, username } = req.body;
  
//     // If all the required properties are present
//     if (product && review && username) {
//       // Variable for the object we will save
//       const newReview = {
//         product,
//         review,
//         username,
//         upvotes: Math.floor(Math.random() * 100),
//         review_id: uuid(),
//       };
  
//       // Convert the data to a string so we can save it
//       const reviewString = JSON.stringify(newReview);
  
//       // Write the string to a file
//       fs.writeFile(`./db/${newReview.product}.json`, reviewString, (err) =>
//         err
//           ? console.error(err)
//           : console.log(
//               `Review for ${newReview.product} has been written to JSON file`
//             )
//       );
  
//       const response = {
//         status: 'success',
//         body: newReview,
//       };
  
//       console.log(response);
//       res.status(201).json(response);
//     } else {
//       res.status(500).json('Error in posting review');
//     }
//   });


app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`))