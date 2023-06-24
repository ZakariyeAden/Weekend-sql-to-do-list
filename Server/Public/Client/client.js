

console.log('In JS file');


$(document).ready(function(){
  addListeners();
  refreshToDo();
});
function addListeners(){
  console.log('Add listener:')
  $('#submit-btn').on('click', handleSubmit);
  $('#toDoList').on('click','.delete-btn', deleteTodo);
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

function deleteTodo(){
  const todoId = $(this).parent().parent().data('id');
  console.log('Todo Id:', todoId);
 // Use the DELETE method and url with the id to target
  $.ajax({
    method:'DELETE',
    url:`/task/${todoId}`
    // Get the response
  }).then((response) => {
    console.log('Response in DeleteToDo',response);
    // Catch any Errors
  }).catch((error) => {
    console.log('ERROR in DELETE deleteTodo', error);
  })
} 
// Reuseable and to to make it refresh after Post!
function render(response){
  for(let ToDos of response){
    console.log("Todo:", ToDos);
    // Append to the toDoList of the response
    let todoRow = $(`
        <ul>
          <li><span>${ToDos.task}</span> <button class="delete-btn">Delete</button></li>
        </ul>
    `);
    // Set the row to the id
    todoRow.data("id", ToDos.id)
    // Log the ids
    console.log(todoRow.data("id"));
    // Append
    $('#toDoList').append(todoRow)
  }
}