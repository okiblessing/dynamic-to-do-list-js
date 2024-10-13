document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn'); // Select the add button
    const taskInput = document.getElementById('task-input');   // Select the input field
    const taskList = document.getElementById('task-list');     // Select the task list

    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' prevents saving to Local Storage again
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        // If taskText is not provided, get it from the input
        if (!taskText) {
            taskText = taskInput.value.trim(); // Get and trim the input value
            if (taskText === "") { // Check if the input is empty
                alert("Please enter a task."); // Alert user if empty
                return; // Exit the function
            }
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText; // Set the text content of the list item
        li.classList.add('task-item'); // Add a class for potential styling

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Set button text
        removeButton.classList.add('remove-btn'); // Add class for styling

        // Add event listener to remove the task when button is clicked
        removeButton.onclick = function() {
            taskList.removeChild(li); // Remove the list item from the task list
            removeTaskFromLocalStorage(taskText); // Remove the task from Local Storage
        };

        // Append the remove button to the list item, then the list item to the task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the input field
        if (save) {
            saveTaskToLocalStorage(taskText); // Save the task to Local Storage
        }
        taskInput.value = ''; // Clear the input field
    }

    // Save task to Local Storage
    function saveTaskToLocalStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText); // Add the new task
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update Local Storage
    }

    // Remove task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText); // Remove the task
        localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Update Local Storage
    }

    // Add event listener for the add button
    addButton.addEventListener('click', () => addTask());

    // Allow adding tasks with the "Enter" key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
