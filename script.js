const apiUrl = 'https://jsonplaceholder.typicode.com/todos'; 
const taskList = document.getElementById('task-list'); 
const taskForm = document.getElementById('task-form'); 
const taskInput = document.getElementById('task-input'); 

// Obtener y mostrar las tareas desde la API
async function fetchTasks() {
    try {
        const response = await fetch(apiUrl);
        const tasks = await response.json();
        displayTasks(tasks.slice(0, 10)); // Mostramos solo 10 tareas para evitar sobrecarga
    } catch (error) {
        console.error('Error al obtener tareas:', error);
    }
}

// Mostrar tareas en la lista
function displayTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.title;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteTask(task.id, li);
        
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Manejar la sumisión del formulario para agregar una nueva tarea
taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const taskTitle = taskInput.value;
    if (taskTitle) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: taskTitle,
                    completed: false,
                }),
            });
            const newTask = await response.json();
            addTaskToList(newTask);
            taskInput.value = '';
        } catch (error) {
            console.error('Error al agregar tarea:', error);
        }
    }
});

// Agregar una nueva tarea a la lista
function addTaskToList(task) {
    const li = document.createElement('li');
    li.textContent = task.title;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => deleteTask(task.id, li);
    
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Eliminar una tarea
async function deleteTask(taskId, listItem) {
    try {
        await fetch(`${apiUrl}/${taskId}`, { method: 'DELETE' });
        taskList.removeChild(listItem);
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
    }
}

// Cargar las tareas cuando la página se cargue
fetchTasks();
