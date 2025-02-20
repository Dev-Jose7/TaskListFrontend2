import Task from "../model/task.js";

export default class TaskRepository{
    #taskArray = [];

    constructor(){
        this.initDB();
        this.restoreInstance();
    }

    save(task){
        if(!this.findById(task.id)){
            this.#taskArray.push(task);
            this.saveAll();
        }
    }

    saveAll(){
        sessionStorage.setItem("taskDB", JSON.stringify(this.#taskArray.map(task => (
            {
                id: task.id,
                idList: task.idList,
                name: task.name,
                description: task.description,
                date: task.date,
                status: task.status
            }
        ))));
    }

    findAll(){
        return this.#taskArray;
    }

    findById(id){
        return this.#taskArray.find(task => task.id == id);
    }

    remove(task){
        let index = this.#taskArray.indexOf(task);
        if(index !== -1){
            this.#taskArray.splice(index, 1);
            this.saveAll();
        }
    }

    restoreInstance(){
        this.#taskArray = [];
        let array = JSON.parse(sessionStorage.getItem("taskDB"));

        for (const task of array) {
            if(!this.findById(task.id)){
                let object = new Task(task.idList, task.name, task.description, task.date);
                object.id = task.id;
                this.#taskArray.push(object);
            }
        
        }
    }

    initDB(){
        if(sessionStorage.getItem("taskDB") == null){
            sessionStorage.setItem("taskDB", "[]");
        }
    }
}