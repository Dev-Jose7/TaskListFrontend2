import TaskContainer from "../container/TaskContainer.js";
import Task from "../model/task.js";
import TaskRepository from "../repository/TaskRepository.js";

export default class TaskService{
    #taskRepository = TaskContainer.repository();

    constructor(){}

    createTask(idList, name, description, date){
        let task = new Task(idList, name, description, date);
        this.#taskRepository.save(task);
        return task;
    }

    getTaskById(id){
        return this.#taskRepository.findById(id);
    }

    getTaskByList(idList){
        return this.#taskRepository.findTaskByIdList(idList);
    }

    getTaskAll(){
        return this.#taskRepository.findAll();
    }

    getDate(){
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        const startDate = new Date(year, 0, 1); // Primer día del año
        const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000)); // Diferencia de días
        let week = Math.ceil((days + 1) / 7);  // Calculamos la semana del año
    
        return [day, week, month, year];
    }

    getDayOnWeek(){
        
    }

    getTasksByDate(date, filter, taskByList){
        let tasks = [];
        
        if(filter == "Día"){
            return tasks = this.#taskRepository.findTaskByDateDay(date[0], taskByList);
        } else if(filter == "Semana"){
            return tasks = this.#taskRepository.findTaskByDateWeek(date[1], taskByList);
        } else if(filter == "Mes"){
            return tasks = this.#taskRepository.findTaskByDateMonth(date[2], taskByList);
        } else if(filter == "Año"){
            return tasks = this.#taskRepository.findTaskByDateYear(date[3], taskByList);
        }
    }

    completeTask(id, response){
        let task = this.#taskRepository.findById(id);
        task.status = response;
        console.log(task);
        this.#taskRepository.saveAll();
    }

    updateTask(id, name, description, date){
        let task = this.#taskRepository.findById(id)
        task.name = name;
        task.description = description;
        task.date = date;
        this.#taskRepository.saveAll();
        return task;
    }

    deleteTask(task){
        this.#taskRepository.remove(task);
    }

    templateTask(array){
        let elemento = "";
        if(array.length == 0){
            elemento = `<h4>Sin Tareas</h4>`
        } else {
            for (const task of array) {
                elemento += `
                <div class="board__task ${task.status ? "board__task--selected" : ""}" data-id=${task.id} data-idList=${task.idList}>
                    <input type="checkbox" class="board__task-check" name="checkStatus" ${task.status ? "checked" : ""}>
                    <div class="board__task-text">
                        <h4>${task.name}</h4>
                        <p>${task.description}</p>
                    </div>
                    <button class="btn btn__list--edit modalOptionButton" data-type="task">···</button>
                </div>`
                
            }   
        }

        return elemento
    }
}