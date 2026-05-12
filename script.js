const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const totalTasksLabel = document.getElementById('totalTasks');
const completedTasksLabel = document.getElementById('completedTasks');

// Carrega as tarefas salvas no navegador ou inicia um array vazio
let tasks = JSON.parse(localStorage.getItem('minhas_tarefas')) || [];

function saveToLocalStorage() {
    localStorage.setItem('minhas_tarefas', JSON.stringify(tasks));
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    
    totalTasksLabel.textContent = `${total} ${total === 1 ? 'tarefa' : 'tarefas'}`;
    completedTasksLabel.textContent = `Concluídas: ${completed}`;
}

function renderTasks() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const div = document.createElement('div');
        div.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        div.innerHTML = `
            <div class="checkbox" onclick="toggleTask(${index})"></div>
            <span class="task-text">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                </svg>
            </button>
        `;
        
        taskList.appendChild(div);
    });
    
    updateStats();
    saveToLocalStorage(); // Salva sempre que algo mudar
}

function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});    

renderTasks();