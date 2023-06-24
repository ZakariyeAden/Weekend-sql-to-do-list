

console.log('In JS file');


$(document).ready(function(){
  addListeners();
});
function addListeners(){
  console.log('Add listener:')
  $('#submit-btn').on('click', refreshToDo);
}
function handleSubmit(){
  console.log('JQ');
}
// POST
function addToDO(){

}
// We want to refresh the todo and GET the todo from db
function refreshToDo(e){
  e.preventDefault();
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
  }).catch((error) => {
    console.log('Errors in refresh:', error);
  })
}
// Reuseable and to to make it refresh after Post!
function render(response){
  for(let ToDos of response){
    console.log('Todo:', ToDos);
    $('#toDoList').append(`
      <li>${ToDos.todo}</li>
    `)
  }
}