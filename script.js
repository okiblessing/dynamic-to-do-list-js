document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn'); // Select the add button
    const taskInput = document.getElementById('task-input');   // Select the input field
    const taskList = document.getElementById('task-list');     // Select the task list

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Get and trim the input value

        if (taskText === "") { // Check if the input is empty
            alert("Please enter a task."); // Alert user if empty
            return; // Exit the function
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
        };

        // Append the remove button to the list item, then the list item to the task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Add event listener for the add button
    addButton.addEventListener('click', addTask);

    // Allow adding tasks with the "Enter" key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(); // Call addTask if Enter is pressed
        }
    });
});