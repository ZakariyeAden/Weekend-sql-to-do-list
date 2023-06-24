

console.log('In JS file');


$(document).ready(function(){
  addListeners();
  refreshToDo();
});
function addListeners(){
  console.log('Add listener:')
  $('#submit-btn').on('click', handleSubmit);
}
function handleSubmit(){
  console.log('JQ');
  // Object of the values
  let todoObject = {
    todo: $('#to-do').val(),
  }
  // Send the object the 
  addToDo(todoObject);
}
// POST
function addToDo(todoToADD){
 // Use the POST method, url, and get the Data thats passed through the parameter
  $.ajax({
    method:'POST',
    url:'/todo',
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
  // Prevent issue in the console and prevent default
 
  console.log('Refresh todo');
  // Use the GET method and url
  $.ajax({
    method: "GET",
    url: "/todo"
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


// Reuseable and to to make it refresh after Post!
function render(response){
  for(let ToDos of response){
    console.log('Todo:', ToDos);
    // Append to the toDoList of the response
    $('#toDoList').append(`
      <li>${ToDos.todo}</li>
    `)
  }
}