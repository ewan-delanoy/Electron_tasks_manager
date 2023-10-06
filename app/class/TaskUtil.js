
class TaskUtil {

   tasks = {} ;

   constructor() {
    this.tasks = [];
    this.#initDefaultTasks();
   }

   addNewTask(task) {  
    task.id = this.tasks.length ? this.tasks[this.tasks.length -1].id + 1 : 1;
    this.tasks.push(task);
   }

   removeTask(idTask) {  
    /* for(const [i,v] of this.tasks.entries()) {
        if(v.id === idTask) {
            this.tasks.splice(i,1)
            break
        }
    } */
    this.tasks=this.tasks.filter(t => t.id !== idTask);
   }

   #initDefaultTasks() {
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