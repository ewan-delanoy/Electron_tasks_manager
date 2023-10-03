import {BrowserWindow} from "electron";
import path from "path";
/* import TaskUtil = require ('./TaskUtil'); */

class WindowUtil {

 views = {} ;

 constructor() {
    this.views = {};
   }

    createWindow(viewName,initListenersFct=undefined,removeListenersFct=undefined,initialData=undefined,width =1400,height = 1000) {
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

    const viewPath = path.join(__dirname, '..', '..', 'src', 'views', viewName, viewName + '.html') ; 

    win.loadFile(viewPath)
    .then(() => {
        if(initialData) {
            win.send('init-data',viewData);
        } 
    });

    if(initListenersFct) initListenersFct();

    if(removeListenersFct) win.on('close',initListenersFct);

    // only in dev mode 
    win.webContents.openDevTools();

    return win;

}

createHomeView() {

    const sendMyMoodCB = () => {
        if('newTaskView' in this.views) this.views.newTaskView.close();
        this.views.newTaskView = this.createWindow('new-task',undefined,undefined,'En pleine digestion',300,300);
        this.views.newTaskView.on('closed', () => this.views.newTaskView = undefined);
    }

    const initListenersFct = () => {
        // ipcMain.on('sendMyMood',sendMyMoodCB);
    }

    const removeListenersFct = () => {
        // ipcMain.removeListener('sendMyMood',sendMyMoodCB);
    }

    this.views.homeView = this.createWindow('home',initListenerFct, removeListenerFct);
    this.views.homeView.on('closed', () => this.views.homeView = undefined);

}

}