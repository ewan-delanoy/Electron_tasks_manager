const {contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld ('ipcRenderer',{
  'invokeAddNewTask':(newTask,cb) => {
    ipcRenderer.invoke('add-new-task',newTask)
    .then(cb);

 }
});