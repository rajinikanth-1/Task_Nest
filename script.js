const taskText = document.getElementById('task-text');
const taskPriority = document.getElementById('task-priority');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const taskCount = document.getElementById('task-count');
const themeToggle = document.getElementById('theme-toggle');
const filterButtons = document.querySelectorAll('.filters button');

// Preloaded tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [
  { text: "Design homepage layout", priority: "high", completed: false },
  { text: "Fix navbar responsiveness", priority: "medium", completed: true },
  { text: "Add animations to buttons", priority: "low", completed: false },
  { text: "Implement dark mode toggle", priority: "medium", completed: true },
  { text: "Write README for GitHub", priority: "low", completed: false },
  { text: "Create task filtering logic", priority: "high", completed: false },
  { text: "Test localStorage persistence", priority: "medium", completed: true },
  { text: "Optimize mobile layout", priority: "high", completed: false },
  { text: "Add priority tag styling", priority: "low", completed: false },
  { text: "Refactor JavaScript functions", priority: "medium", completed: false }
];

function renderTasks(filter = 'all') {
  taskList.innerHTML = '';
  const filtered = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task ${task.completed ? 'completed' : ''} priority-${task.priority}`;
    li.innerHTML = `
      <div>
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${index})" />
        <span>${task.text}</span>
      </div>
      <button onclick="deleteTask(${index})">🗑️</button>
    `;
    taskList.appendChild(li);
  });

  taskCount.textContent = filtered.length;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const text = taskText.value.trim();
  const priority = taskPriority.value;

  if (text) {
    tasks.push({ text, priority, completed: false });
    taskText.value = '';
    taskPriority.value = 'low';
    renderTasks();
  }
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

addTaskBtn.addEventListener('click', addTask);
taskText.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask();
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => renderTasks(btn.dataset.filter));
});

renderTasks();