// Select elements
const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const todayTasksNav = document.getElementById('today-tasks-nav');
const scheduledTasksNav = document.getElementById('scheduled-tasks-nav');
const mainHeader = document.getElementById('main-header');
const subHeader = document.getElementById('sub-header');

// Task storage
let todayTasks = [];
let scheduledTasks = [];

// Active view
let activeView = 'today'; // Default to "Today tasks"

// Add Task
addTaskBtn.addEventListener('click', () => {
  const taskValue = taskInput.value.trim();
  if (!taskValue) {
    alert('Please enter a task!');
    return;
  }

  // Add task to the correct list
  if (activeView === 'today') {
    todayTasks.push(taskValue);
  } else {
    scheduledTasks.push(taskValue);
  }

  // Refresh the displayed tasks
  renderTasks();

  // Clear input
  taskInput.value = '';
});

// Render tasks based on active view
function renderTasks() {
  taskList.innerHTML = ''; // Clear the current list
  const tasks = activeView === 'today' ? todayTasks : scheduledTasks;

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    const taskSpan = document.createElement('span');
    taskSpan.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    // Delete Task
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1); // Remove task from the array
      renderTasks(); // Refresh the list
    });

    taskItem.appendChild(taskSpan);
    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
  });
}

// Navigation click events
todayTasksNav.addEventListener('click', () => {
  activeView = 'today';
  todayTasksNav.classList.add('active');
  scheduledTasksNav.classList.remove('active');
  mainHeader.textContent = 'Today Main Focus';
  subHeader.textContent = 'Design Team Meeting';
  renderTasks();
});

scheduledTasksNav.addEventListener('click', () => {
  activeView = 'scheduled';
  todayTasksNav.classList.remove('active');
  scheduledTasksNav.classList.add('active');
  mainHeader.textContent = 'Scheduled Tasks';
  subHeader.textContent = 'Review and Plan';
  renderTasks();
});

// Initial render
renderTasks();
