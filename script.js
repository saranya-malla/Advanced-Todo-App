let addBtn=document.getElementById("addBtn");

let taskInput=document.getElementById("taskInput");

let taskList=document.getElementById("taskList");

let searchInput=document.getElementById("searchInput");

let themeBtn=document.getElementById("themeBtn");

let deleteAll=document.getElementById("deleteAll");

showTasks();

addBtn.addEventListener(
"click",
addTask
);

taskInput.addEventListener(
"keypress",
function(event){

if(event.key==="Enter")
{
addTask();
}

}
);

searchInput.addEventListener(
"keyup",
searchTask
);

themeBtn.addEventListener(
"click",
toggleTheme
);

deleteAll.addEventListener(
"click",
function(){

taskList.innerHTML="";

saveTasks();

updateStats();

}
);

function addTask()
{

let taskText=
taskInput.value.trim();

if(taskText==="")
{
alert("Enter task");

return;
}

let li=
document.createElement("li");

li.innerHTML=`

<span onclick="toggleComplete(this)">
${taskText}
</span>

<div>

<button onclick="editTask(this)">
✏️
</button>

<button onclick="deleteTask(this)">
❌
</button>

</div>

`;

taskList.appendChild(li);

taskInput.value="";

saveTasks();

updateStats();

}

function deleteTask(button)
{

button.parentElement.parentElement.remove();

saveTasks();

updateStats();

}

function editTask(button)
{

let task=
button.parentElement.previousElementSibling;

let newTask=
prompt(
"Edit task",
task.innerText
);

if(newTask)
{
task.innerText=newTask;

saveTasks();
}

}

function toggleComplete(task)
{

task.classList.toggle(
"completed"
);

saveTasks();

updateStats();

}

function saveTasks()
{

localStorage.setItem(
"tasks",
taskList.innerHTML
);

}

function showTasks()
{

taskList.innerHTML=
localStorage.getItem("tasks")
|| "";

updateStats();

}

function searchTask()
{

let filter=
searchInput.value.toLowerCase();

let li=
document.querySelectorAll("li");

li.forEach(function(item){

let text=
item.innerText.toLowerCase();

item.style.display=
text.includes(filter)
?
"flex"
:
"none";

});

}

function updateStats()
{

let total=
document.querySelectorAll("li").length;

let completed=
document.querySelectorAll(".completed").length;

let pending=
total-completed;

document.getElementById(
"total"
).innerText=total;

document.getElementById(
"completed"
).innerText=completed;

document.getElementById(
"pending"
).innerText=pending;

}

function toggleTheme()
{

document.body.classList.toggle(
"dark"
);

}