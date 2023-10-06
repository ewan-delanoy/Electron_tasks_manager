

function generateTaskRow(task) {
    const row = document.createElement('tr');
    const labelTd = document.createElement('td');
    labelTd.textContent = task.label ;
    row.appendChild(labelTd);

    const descriptionTd = document.createElement('td');
    descriptionTd.textContent = task.description;
    row.appendChild(descriptionTd);

    const statusTd = document.createElement('td');
    statusTd.textContent = task.status ? 'Terminée' : 'En cours';
    row.appendChild(statusTd);

    const actionsTd = document.createElement('td')
    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'SUPPR.'
    deleteBtn.classList.add('btn','btn-danger')
    deleteBtn.addEventListener('click', () => {
         // Envoyer un message
         // puis effacer la ligne du tableau 
         window.ipcRenderer.invokeAskDeleteTask(task.id, (isDeleted) => {
            if(isDeleted) {
                row.remove();
            }
         });
    })
    actionsTd.appendChild(deleteBtn)
    row.appendChild(actionsTd)


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