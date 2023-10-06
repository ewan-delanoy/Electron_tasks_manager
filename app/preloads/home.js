const {contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld ('ipcRenderer',{
  
  'invokeAskDeleteTask':(idTask,cb) => {
    ipcRenderer
    .invoke('ask-delete-task', idTask)
    .then(cb)
    ;

 },'onceInitData':(cb) => {
     ipcRenderer.once('init-data', cb);

  },
  'sendOpenNewTaskView':() => {
    ipcRenderer.send('open-new-task-view');

 },
 'onShowNewTask':(cb) => {
  ipcRenderer.on('show-new-task', cb);

}
});