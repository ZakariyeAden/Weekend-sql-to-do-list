// Imports
const express = require('express');
const pool = require('../../Modules/pool');
const router = express.Router();


// GET
router.get('/', (req,res) => {
  // Get all of the data from table
  let getQueryTodo = 'SELECT * FROM "Todo";';

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



// POST
router.post('/', (req, res) => {
  // GET the Data they submitted
  let newTodo = req.body;
  // INSERT it into the table
  let queryToDoPost = `INSERT INTO "Todo" ("todo") VALUES ($1);`
  // Parameterizations and use req.body
  let toDoParams = [newTodo.todo];
  // Query with pool and use queryTodo and Parameterizations 
  pool.query(queryToDoPost, toDoParams)
  // Get the response
  .then((result) => {
    // Get an OK response
    res.sendStatus(201);
    // Catch any Errors
  }).catch((error) => {
    console.log('ERRORS in POST:', error);
    // Send an Error status
    res.sendStatus(500);
  })
})


module.exports = router