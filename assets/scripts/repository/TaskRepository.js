import Task from "../model/task.js";

export default class TaskRepository{
    #taskArray = [];

    constructor(){
        this.initDB();
        this.restoreInstance();
    }

    save(task){
        if(!this.findById(task.id) && !this.findByName(task.name)){
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
        console.log(this.#taskArray)
    }

    findAll(){
        return this.#taskArray;
    }

    findById(id){
        return this.#taskArray.find(task => task.id == id);
    }

    findByName(name){
        return this.#taskArray.find(task => task.name == name);
    }

    findTaskByIdList(idList){
        return this.#taskArray.filter(task => task.idList == idList);
    }

    findTaskByDateDay(date, taskByList){
        taskByList.forEach(e => {
        });
        
        return taskByList.filter(task => task.day == date);
    }

    findTaskByDateWeek(date, taskByList){
        return taskByList.filter(task => task.week == date);
    }

    findTaskByDateMonth(date, taskByList){
        return taskByList.filter(task => task.month == date);
    }

    findTaskByDateYear(date, taskByList){
        return taskByList.filter(task => task.year == date);
    }

    remove(task){
        let index = -1
        this.#taskArray.find((t, i) => {
            if(t.id == task.id){
                index = i;
            }
        })

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
                object.status = task.status
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