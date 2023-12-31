

console.log('In JS file');


$(document).ready(function(){
  $('#submit-btn').on('click', handleSubmit);
  refreshToDo();
  addListeners();
});

const Modal = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    customClass: {
      confirmButton: 'delete-todo',
    },
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}
function addListeners(){
  console.log('Add listener:')
  $('#toDoList').on('click','.complete', updateToDo);
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
// GET
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
// DELETE
function deleteTodo(){
  // Get the todo Id
  const todoIdDelete = $(this).parent().parent().data('id');
  // Use the DELETE method and url with the id to target
  $.ajax({
    method:'DELETE',
    url:`/task/${todoIdDelete}`
    // Get the response
  }).then((response) => {
    console.log('Response in DeleteToDo',response);
    // Refresh
    refreshToDo();
    // Catch any Errors
  }).catch((error) => {
    console.log('ERROR in DELETE deleteTodo', error);
  })
} 

function updateToDo(){
  // Get the todo Id
  const todoIdUpdate = $(this).parent().parent().data('id');
  $.ajax({
    method:'PUT',
    url:`/task/${todoIdUpdate}`
  }).then((response) => {
    console.log('Update the todo to complete!', response);
    // Refresh
    refreshToDo();
  }).catch((error) => {
    console.log('ERROR in UPDATE updateTodo', error)
  })
}
// Reuseable and to to make it refresh after Post!
function render(response){
  $("#toDoList").empty();
  for(let i = 0; i < response.length; i++){
    // if 'complete' is true 
    if(response[i].complete == true){
    // Append to the toDoList of the response and Show the delete button
    $('#toDoList').append(`  <tr data-id=${response[i].id} class="">
    <td class="text todo-text">${response[i].task}</td>
    <td><button type="button" class="btn btn-danger delete-btn ml-3 ">Delete</button></td>
    </tr>`) 
    }else {
      // Else show the complete button
      $('#toDoList').append(`  <tr data-id=${response[i].id} class="">
      <td class"todo-text">${response[i].task}</td>
      <td><button type="button" class="btn btn-primary complete ml-3">Complete</button></td>
      </tr>`) 
    }
  }
}