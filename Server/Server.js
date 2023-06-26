// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const todo = require('./Public/Routes/todo.router')
// PORT
const PORT = process.env.PORT|| 5000;

// Use Body parser with Express
app.use(bodyParser.urlencoded({extended: true}));
// Find the Index.html in Public and Connect it w/ Express
app.use(express.static('Server/public'));

// Routes
app.use('/task', todo)


// Listening on PORT 5000
app.listen(PORT, () => {
  console.log('Listening on PORT', PORT);
})