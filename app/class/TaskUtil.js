import {BrowserWindow} from "electron";
import path from "path";

class TaskUtil {

   tasks = {} ;

   constructor() {
    this.tasks = [];
   }

   addNewTask(task) {  
    this.tasks.push(task);
   }

   _initDefaultTasks() {
        this.addNewTask({
            label : 'Apprendre NodeJS',
            description : 'Apprendre les bases de NodeJS & Express',
            status : false
        });
        this.addNewTask({
            label : 'Apprendre Electron',
            description : 'Apprendre les bases de la création d\'application Desktop',
            status : false
        });
   } 
}

module.exports = new TaskUtil();