// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// PORT
const PORT = 500;

// Use Body parser with Express
app.use(bodyParser.urlencoded({extended: true}));


// Listening on PORT 5000
app.listen(PORT, () => {
  console.log('Listening on PORT', PORT);
})