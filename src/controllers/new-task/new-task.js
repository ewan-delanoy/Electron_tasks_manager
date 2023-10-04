const newTaskForm = document.querySelector('#newTaskForm');
const successMsgDiv = document.querySelector('#successMsg');

const addNewTaskCb = (res) => {
  successMsgDiv.hidden=false;
  newTaskForm.reset();
  setTimeout( () => {
    successMsgDiv.hidden=true;
    newTaskForm.reset();
  }, 5000);
}

newTaskForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const formData = new FormData(e.target);

    const task = Object.fromEntries(formData.entries());

    window.ipcRenderer.invokeAddNewTask(task,addNewTaskCb);

});