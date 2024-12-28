document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');


taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value;
  if (taskText.trim() === '') return;

  addTaskToList(taskText);
  saveTaskToLocalStorage(taskText);
  taskInput.value = '';
});


function addTaskToList(taskText) {
  const li = document.createElement('li');
  li.innerHTML = `
    ${taskText}
    <button class="delete">Delete</button>
  `;
  li.addEventListener('click', toggleComplete);
  li.querySelector('.delete').addEventListener('click', deleteTask);
  taskList.appendChild(li);
}

function toggleComplete(e) {
  this.classList.toggle('completed');
}


function deleteTask(e) {
  e.stopPropagation();
  const taskItem = this.parentElement;
  removeTaskFromLocalStorage(taskItem.textContent.replace('Delete', '').trim());
  taskItem.remove();
}


function saveTaskToLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(addTaskToList);
}


function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}


function removeTaskFromLocalStorage(task) {
  const tasks = getTasksFromLocalStorage();
  const filteredTasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(filteredTasks));
}