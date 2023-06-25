

console.log('In JS file');


$(document).ready(function(){
  addListeners();
  refreshToDo();
});
function addListeners(){
  console.log('Add listener:')
  $('#submit-btn').on('click', handleSubmit);
  $('#toDoList').on('click','.delete-btn', deleteTodo);
  $('#toDoList').on('click','.complete', updateToDo);
}
function handleSubmit(){
  console.log('JQ');
  // Object of the values
  let todoObject = {
    todo: $('#to-do').val(),
  }
  // Send the object to the function of POST
  addToDo(todoObject);
}
// POST
function addToDo(todoToADD){
 // Use the POST method, url, and get the Data thats passed through the parameter
  $.ajax({
    method:'POST',
    url:'/task',
    data:todoToADD
    // Get the response
  }).then((response) => {
    console.log('AddToDo, POST:',response);
    // Refresh the todo
    refreshToDo();
    // Catch any ERRORS
  }).catch((error) => {
    console.log('ERRORS in addToDo POST:', error);
  })
}
// We want to refresh the todo and GET the todo from db
// GET
function refreshToDo(){
  console.log('Refresh todo');
  // Use the GET method and url
  $.ajax({
    method: "GET",
    url: "/task"
    // Get the response it sends
  }).then((response) => {
    // Render function
    render(response);
    // Log the Response
    console.log('My Response:', response);
    // Catch any Errors
  }).catch((error) => {
    console.log('Errors in refresh:', error);
  })
}
// DELETE
function deleteTodo(){
  // Get the todo Id
  const todoIdDelete = $(this).parent().parent().data('id');
  // console.log('Todo Id:', todoId);
 // Use the DELETE method and url with the id to target
  $.ajax({
    method:'DELETE',
    url:`/task/${todoIdDelete}`
    // Get the response
  }).then((response) => {
    console.log('Response in DeleteToDo',response);
    // Catch any Errors
  }).catch((error) => {
    console.log('ERROR in DELETE deleteTodo', error);
  })
} 

function updateToDo(){
  // Get the todo Id
  const todoIdUpdate = $(this).parent().parent().data('id');
  // console.log('Todo Id:', todoId);
  $.ajax({
    method:'PUT',
    url:`/task/${todoIdUpdate}`
  }).then((response) => {
    console.log('Update the todo to complete!', response);
    // addToDo();
  }).catch((error) => {
    console.log('ERROR in UPDATE updateTodo', error)
  })
}
// Reuseable and to to make it refresh after Post!
function render(response){
  for(let ToDos of response){
    console.log("Todo:", ToDos);
    // Append to the toDoList of the response
      $('#toDoList').append(`  <tr data-id=${ToDos.id}>
      <td><input type="checkbox">${ToDos.task}</td>
      <td><button class="delete-btn">Delete</button></td>
      <td><button class="complete">Complete</button></td>
    </tr>`) 
  }
}