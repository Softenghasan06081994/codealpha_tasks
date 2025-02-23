function addTask() {
    const taskInput = document.getElementById('task');
    const dueDateInput = document.getElementById('due-date');
    const priorityInput = document.getElementById('priority');
    const taskList = document.getElementById('task-list');

    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${taskText}</span>
        <span>Due: ${dueDate || 'No date'}</span>
        <span>Priority: ${priority}</span>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    
    taskList.appendChild(listItem);
    console.log('Task added');

    // Clear input fields
    taskInput.value = '';
    dueDateInput.value = '';
    priorityInput.value = 'Low';
}

function deleteTask(button) {
    button.parentElement.remove();
    console.log('Task deleted');
}

function searchTasks() {
    console.log('Searching tasks...');
}
