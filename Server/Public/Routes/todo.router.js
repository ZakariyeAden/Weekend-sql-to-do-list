// Imports
const express = require('express');
const pool = require('../../Modules/pool');
const router = express.Router();


// GET
router.get('/', (req,res) => {
  // Get all of the data from table
  let getQueryTodo = 'SELECT * FROM "Todos";';

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
  let queryToDoPost = `INSERT INTO "Todos" ("task") VALUES ($1);`
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


// DELETE
router.delete('/:id', (req, res) => {
  // Get the id clicked that was requested
  let paramsId = req.params.id;
  // Query to Delete
  let queryToDoDelete = 'DELETE FROM "Todos" WHERE "id" = $1';
 // Query with pool and use queryTodo and Parameterizations 
  pool.query(queryToDoDelete, [paramsId])
  // Get the Response
  .then((response) => {
    // Send Log
    console.log('DELETE todo:');
    // Get an OK status -- See in Postman
    res.sendStatus(200);
    // Catch any Errors
  }).catch((error) => {
    console.log(`DELETE ${queryToDoDelete}`, error);
    res.sendStatus(500);
  })
})

// GET the Id and Update it to be checked off by Using CSS
router.put('/:id', (req, res) => {
  // Get the id clicked that was requested
  let paramsId = req.params.id;
  // Query to Get and Change -- Will use CSS and Event delegation to change it in Client
  let queryToDoUpdate = `UPDATE "Todos" SET "complete" = 'TRUE' WHERE "id" = $1;`;
  
 // Query with pool and use queryTodo and Parameterizations 
  pool.query(queryToDoUpdate, [paramsId])
  // Get the Response
  .then((response) => {
    // Send Log
    console.log('Change todo:');
    // Get an OK status -- See in Postman
    res.sendStatus(200);
    // Catch any Errors
  }).catch((error) => {
    console.log(`ERROR ${queryToDoUpdate}`, error);
    res.sendStatus(500);
  })
})

module.exports = router