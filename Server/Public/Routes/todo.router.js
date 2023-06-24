// Imports
const express = require('express');
const pool = require('../../Modules/pool');
const router = express.Router();


// GET
router.get('/', (req,res) => {
  // Get all of the data from table
  let getQueryTodo = 'SELECT * FROM todo';

  pool.query(getQueryTodo)
  // Wanna get the results from the database
  .then((result) => {
    // See the results in the Log
    console.log('Results:', result)
    // Send the Result Rows
    res.send(result.rows);
    // Catch any Errors
  }).catch((error) => {
    console.log(`Error in ${getQueryTodo} GET:`, error);
  })
})


module.exports = router