

function generateTaskRow(task) {
    const row = document.createElement('tr');
    const labelDiv = document.createElement('td');
    labelDiv.textContent = task.label ;
    row.appendChild(labelDiv);

    const descriptionDiv = document.createElement('td');
    descriptionDiv.textContent = task.description;
    row.appendChild(descriptionDiv);

    const statusDiv = document.createElement('td');
    statusDiv.textContent = task.status ? 'Terminée' : 'En cours';
    row.appendChild(statusDiv);

    document.querySelector('#tasks-tbody').appendChild(row);

}

////////////////////////////////////////////////////////////// LISTENERS

const onceInitDataCb = (e,tasks) => {
    tasks.forEach(generateTaskRow);
};

const onShowNewTaskCb = (e,task) => {
    generateTaskRow(task);
};

window.ipcRenderer.onceInitData(onceInitDataCb);
window.ipcRenderer.onShowNewTask(onShowNewTaskCb);

document.querySelector('#newTaskBtn').addEventListener('click', window.ipcRenderer.sendOpenNewTaskView);