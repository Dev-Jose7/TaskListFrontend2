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
                        <input type="checkbox" class="board__task-check" ${task.status ? "checked" : ""}>
                        <div class="board__task-text">
                            <h4>${task.name}</h4>
                            <p>${task.description}</p>
                        </div>
                        <button class="btn btn__list--edit editTask">···</button>
                    </div>`
            }   
        }

        return elemento
    }

    templateModal(type, task){
        let elemento = `
            <div class="modal__container modal__container--form" id="modalTask">
                <div class="modal__content">
                    <div class="modal__header">
                        <h3>${type} tarea</h3>
                        <button class="btn-close">
                            <i class="fas fa-times"></i> <!-- Icono de la X -->
                        </button>
                    </div>
                    <div class="modal__body">
                        ${type == "Opciones" || type == "Eliminar" || type == "Confirmar" ? `
                        <div class="board__task">
                            <div class="board__task-text board__task-text--modal">
                                <h4>${task.name}</h4>
                                <p>${task.dateFormat}</p>
                                <p>${task.description}</p>
                            </div>
                        </div>`
                            :
                        `<div id="modalForm">
                            <input type="text" class="form-input" id="inputNameTask" placeholder="Nombre" value="${type == "Actualizar" ? task.name : ""}" required>
                            <input type="date" class="form-input" id="inputDateTask" placeholder="Fecha" value="${type == "Actualizar" ? task.dateFormat : ""}" required>
                            <textarea class="form-input" id="inputDescriptionTask" placeholder="Mensaje (Opcional)" rows="4"></textarea>
                        </div>`}
                    </div>
                    
                    <div class="modal__footer ${type == "Crear" || type == "Actualizar" ? "modal__footer--one" : ""}">
                        ${type == "Opciones" ? `
                            <button class="btn btn__option" id="updateTask">
                                <i class="fas fa-pen-alt"></i>
                                Modificar
                            </button>
                            <button class="btn btn__option" id="deleteTask">
                                <i class="fas fa-trash-alt"></i>
                                Eliminar
                            </button>` 
                                : 
                        type == "Eliminar" ? `
                            <button class="btn btn__option" id="deleteTask">
                                <i class="fas fa-check"></i>
                                Si
                            </button>
                            <button class="btn btn__option" id="keepTask">
                                <i class="fas fa-times"></i>
                                No
                            </button>` 
                                :
                        type == "Crear" || type == "Actualizar" ? `
                            <button class="btn btn__option" type="submit" form="modalForm" id="${type == "Crear" ? "addTask" : "updateTask"}">
                                <i class="fas fa-plus"></i>
                                ${type == "Crear" ? "Crear" : "Actualizar"}
                            </button>` 
                                : 
                        ``}
                    </div>
                </div>
            </div>`
    
        return elemento;
    }
}