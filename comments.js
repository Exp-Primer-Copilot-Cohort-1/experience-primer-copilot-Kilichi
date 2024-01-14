// Create web server
// http://localhost:3000/comments
// http://localhost:3000/comments/1

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3000;
const path = require('path');
const commentPath = path.join(__dirname, 'data/comments.json');

// Read file
const comments = JSON.parse(fs.readFileSync(commentPath, 'utf8'));

// Set view engine
app.set('view engine', 'ejs');

// Set middleware
app.use(bodyParser.urlencoded({extended: true}));

// Set route
app.get('/comments', (req, res) => {
  res.render('comments/index', {comments: comments});
});

app.get('/comments/new', (req, res) => {
  res.render('comments/new');
});

app.get('/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  res.render('comments/show', {comment: comment});
});

app.post('/comments', (req, res) => {
  const comment = {
    id: Date.now(),
    name: req.body.name,
    comment: req.body.comment
  };
  comments.push(comment);
  // Write file
  fs.writeFileSync(commentPath, JSON.stringify(comments), 'utf8');
  res.redirect('/comments');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});