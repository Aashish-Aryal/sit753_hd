document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete">Delete</button>
                </div>
            `;
            li.querySelector('.complete').addEventListener('click', () => toggleCompleteTask(index));
            li.querySelector('.delete').addEventListener('click', () => deleteTask(index));
            taskList.appendChild(li);
        });
    }

    // Add new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
    }

    // Toggle complete task
    function toggleCompleteTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    // Delete task
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add event listeners
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });

    // Initial render
    renderTasks();
});
