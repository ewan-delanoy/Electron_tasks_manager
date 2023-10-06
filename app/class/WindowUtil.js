const {BrowserWindow, ipcMain, dialog} = require('electron');
const path= require ('path');
const TaskUtil = require ('./TaskUtil'); 

class WindowUtil {

 views = {} ;

 constructor() {
    this.views = {};
   }

    

createHomeView() {

    
    const openNewTaskViewCB = () => {
        if('newTaskView' in this.views) {
            this.views.newTaskView.focus();
        }    
        this.views.newTaskView = this.#createWindow('new-task');
        this.views.newTaskView.on('closed', () => this.views.newTaskView = undefined);
    }
    
    const addNewTaskCb =  (e,newTask) => {
            TaskUtil.addNewTask(newTask);
            this.views.homeView.send('show-new-task',newTask);
            return true;
    };

    const askDeleteTaskCb =  (e,idTask) => {
        const choice = dialog.showMessageBoxSync({
            type:'warning',
            buttons: ['Non','Oui'], // [0,1] en javascript
            title : 'Confirmation de supression',
            message : 'Êtes-vous sûr de vouloir supprimer cet élément ?' 
        })
        if(choice) {
            TaskUtil.removeTask(idTask)
        }
        return choice;
};


    const initListenersFct = () => {
        ipcMain.on('open-new-task-view',openNewTaskViewCB);
        ipcMain.handle('add-new-task', addNewTaskCb);
        ipcMain.handle('ask-delete-task', askDeleteTaskCb);
    }

    const removeListenersFct = () => {
        ipcMain.removeListener('open-new-task-view',openNewTaskViewCB);
        ipcMain.removeHandler('add-new-task');
        ipcMain.removeHandler('ask-delete-task');
    }

    this.views.homeView = this.#createWindow('home',initListenersFct, removeListenersFct,TaskUtil.tasks);
    this.views.homeView.on('closed', () => this.views.homeView = undefined);

}

#createWindow(viewName,initListenersFct=undefined,removeListenersFct=undefined,initialData=undefined,width =1400,height = 1000) {
    const win = new BrowserWindow({
        width,
        height,
        webPreferences: {
            // on arrête d'exposer les node_modules côté front
            nodeIntegration: false,
            // on isole tout pour éviter les problèmes
            contextIsolation: true,
            // on arrête d'exposer le module remote d'Electron
            enableRemoteModule: false,
            // on donne à notre vue le fichier preload.js pour qu'elle expose
            // la clé et la méthode loadController
            preload: path.join(__dirname, '..', 'preloads', `${viewName}.js`)
        }
    });

    const viewPath = path.join(__dirname, '..', '..', 'src', 'views', viewName, `${viewName}.html`) ; 

    win.loadFile(viewPath)
    .then(() => {
        if(initialData) {
            win.send('init-data',initialData);
        } 
    });

    if(initListenersFct) initListenersFct();

    if(removeListenersFct) win.on('close',initListenersFct);

    // only in dev mode 
    win.webContents.openDevTools();

    return win;

}


}

module.exports = new WindowUtil ();