let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const categorySelect = document.getElementById('categorySelect');
    const dueDate = document.getElementById('dueDate');
    
    if (taskInput.value.trim() === '') return;
    
    const newTask = {
        id: Date.now(),
        title: taskInput.value,
        category: categorySelect.value,
        dueDate: dueDate.value,
        priority: 'medium',
        tags: [],
        completed: false,
        createdAt: new Date()
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleComplete(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

function editTask(id) {
    // Implement edit functionality
    console.log('Edit task:', id);
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const container = document.getElementById('tasksContainer');
    container.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-card ${task.completed ? 'completed' : ''}`;
        taskElement.innerHTML = `
            <div class="task-info">
                <div class="task-title">${task.title}</div>
                <div class="task-details">
                    <span>${task.category}</span>
                    <span>${new Date(task.dueDate).toLocaleDateString()}</span>
                    <span class="priority ${task.priority}">${task.priority}</span>
                </div>
            </div>
            <div class="task-actions">
                <button onclick="toggleComplete(${task.id})">
                    <i class="fas fa-${task.completed ? 'undo' : 'check'}"></i>
                </button>
                <button onclick="editTask(${task.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteTask(${task.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(taskElement);
    });
}

// Initial render
renderTasks();

// Filter functionality
document.getElementById('filterCategory').addEventListener('change', renderTasks);
document.getElementById('filterPriority').addEventListener('change', renderTasks);
document.getElementById('filterDueDate').addEventListener('change', renderTasks);

// Add advanced features like drag-and-drop, tags, and priority management here