// (var Data = {}) is a 'globally accesible' ['data'(object)] we can use to store our data.
// (localStorage.getItem('todolist')) ? JSON.parse(localStorage.getItem('todolist')):{...} puts a simple if/else statment
// in front of our object that checks if there is data in localStorage for this application, and if there is it will parse the data into an object,
// to be rendered into the DOM, else it will create an empty ['data'(object)]
var data = (localStorage.getItem('todolist')) ? JSON.parse(localStorage.getItem('todolist')):{
  todo: [],
  complete: []
};

//Variables to store our SVG's for our buttons;
//However, it has been suggest to add the SVG into the HTML directly and then
//pull it out using Javascript and copy it when you add an item. 
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"> <rect y="0" class="nofill" width="22" height="22"/> <g> <g> <path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/> </g> <g> <g> <path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/> </g> <g> <path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/> </g> <g> <path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/> </g> </g> </g> </svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"> <rect y="0" class="nofill" width="22" height="22"/> <g> <path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8 c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/> </g> </svg>';

//Must be placed after any globally declared variables, or they will fail to load before we attempt to run program.
renderTodoList();

//User clicked on Add button
// if there is text inside input field add to todo list
document.getElementById("add").addEventListener('click', function (){
  //grabs value of 'input'
  var value = document.getElementById('input').value;
  // If value Exists
  if (value) {
    addInput(value);
  }
});
//User pressed down the Enter key
// if there is text inside input field add to todo list
document.getElementById('input').addEventListener('keydown', function(e){
  var value = this.value;
  if (e.code === 'Enter' && value) {
    addInput(value);
  };
});

//function that governs the function which takes the value from the input
//field when either the 'add button' event listener is 'clicked'; or the 'Enter'
//is pressed down.
function addInput(value) {
  // calls our ['addItemTodo'(function)] .
  addItemToDOM(value);
  // Reset the input field
  document.getElementById('input').value = '';
  data.todo.push(value);
  dataObjectUpdated();
}

//Function to Render any 'Existing Data' from Local Storage into the DOM when
//when the application loads.
function renderTodoList() {
  //checks if there is any data in the Data object, if not returns nothing.
  if (!data.todo.length && !data.complete.length) return;

  //for each item within the ['todo'(array)] within the ['data'(Object)] will add
  //it to the DOM
  for (var i = 0; i < data.todo.length; i++){
    var value = data.todo[i];
    addItemToDOM(value);
  }

  //for each item within the ['complete'(array)] within the ['data'(Object)] will add
  //it to the DOM
  for (var j = 0; j < data.complete.length; j++ ){
    var value = data.complete[j];
    addItemToDOM(value, true);
  }
}

//for each time the ['data'(Object)] is manipulated (Add/Complete-ReAdd/Remove);
function dataObjectUpdated() {
  // will first console.log the ['data'(Object)]
  console.log(JSON.stringify(data));
  // second will stringify our ['data'(Object)] and set it into local Storage
  localStorage.setItem('todolist', JSON.stringify(data));
};

function removeItem(){
  // grab the [(li)'item'] => ['button'(div)] => ['remove'(button)]
  var item = this.parentNode.parentNode;
  // grab the [(ul)] => [(li)'item']
  var parent = item.parentNode;

  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.complete.splice(data.todo.indexOf(value), 1);
  };
  dataObjectUpdated();
  // Remove [(li)'item'] from Parent [(ul)]
  parent.removeChild(item);

};

function completeItem(){
   var item = this.parentNode.parentNode;
   var parent = item.parentNode;
   var id = parent.id;
   var value = item.innerText;

   if (id === 'todo') {
     data.todo.splice(data.todo.indexOf(value), 1);
     data.complete.push(value);
   } else {
     data.complete.splice(data.todo.indexOf(value), 1);
     data.todo.push(value);
   };
   dataObjectUpdated();


   //check to see if item should be added to complete list or re-added to todo list.
   // if (id === 'todo') {
   //   //it's a todo item to be completed
   //    target = document.getElementById('complete');
   // } else {
   //   //else its a completed item to be "re-done"
   //    target = document.getElementById('todo');
   // }  can be re-written as
   var target = (id === 'todo') ? document.getElementById('complete'):document.getElementById('todo');

   parent.removeChild(item);
   target.insertBefore(item, target.childNodes[0]);

};

function addItemToDOM(text, complete) {
  // Target the ['Ul'(element)] we will be adding our Item too
  var list = (complete) ? document.getElementById('complete'):document.getElementById('todo');

  // Build HTML Item

    // Build 'Li' + add the Text which is the value to the ['innerText'(property)]
    // of the 'li' element i.e. <li>Text</li>
  var item = document.createElement('li');
  item.innerText = text;

    // Build 'Div' + add [class='buttons'] via ['classList'(method)].
  var buttons = document.createElement('div')
  buttons.classList.add('buttons');

    // Build 'Button' + add [class='remove'] via ['classList'(method)]
    // + Add [remove_icon.svg] via 1) 'var = removeSVG', then 2) ['innerHTML'(property)].
  var remove = document.createElement('button');
  remove.classList.add('remove');
  remove.innerHTML = removeSVG;

  //Add click event for remove the item
  remove.addEventListener('click', removeItem);

    // Build 'Button' + add [class='complete'] via ['classList'(method)]
    // + Add [done_icon.svg] via 1) 'var = completeSVG', then 2) ['innerHTML'(property)].
  var complete = document.createElement('button');
  complete.classList.add('complete');
  complete.innerHTML = completeSVG;

  //Add click event for complete the item
  complete.addEventListener('click', completeItem);

    //First Add buttons (in order) to the ['div' w/ class='Buttons']: first remove, then Complete;
  buttons.appendChild(remove);
  buttons.appendChild(complete);

    //then add ['buttons'(div)] to the [(li)'item']
  item.appendChild(buttons);

    // then add [(li)'item'] to the appropriate list via the list variable;
    // In order to append the item to the beginning of the list use the
    // ['insertBefore'(method)] --->
    // syntax: htmlElement.insertBefore(item to be inserted, htmlElement.childNodes[the child node you wish to append in front of])
  list.insertBefore(item, list.childNodes[0]);
};
