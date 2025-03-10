import TaskContainer from "../container/TaskContainer.js";
import Modal from "../UI/Modal.js";
import Pagination from "../UI/Pagination.js";

export default class TaskController{
    #taskService = TaskContainer.service(); // Se crea de acuerdo al contexto, este atributo no esta por defecto

    constructor(){}

    addTask(){
        let inputName = document.getElementById("inputNameModal");
        let inputDate = document.getElementById("inputDateModal")
        let inputDescription = document.getElementById("inputDescriptionModal");
        let idList = document.getElementById("taskContainer").dataset.idList;

        let task = TaskContainer.service().createTask(idList, inputName.value, inputDescription.value, inputDate.value);
        // TaskContainer.controller().modalConfirm(task, "¡Tarea creada con éxito!");
        TaskContainer.controller().printTask();
        return task;
    }

    getTask(filter){ //Se obtiene las tareas por el id de su lista y por el filtro de fecha
        let taskContainer = document.getElementById("taskContainer");
        let boardPagination = document.getElementById("pageTask");
        let idList = document.getElementById("taskContainer").dataset.idList;
        let date = this.#taskService.getDate();
        let tasks = this.#taskService.getTasksByDate(date, filter, this.#taskService.getTaskByList(idList));
        console.log(tasks);

        taskContainer.innerHTML = "";
        boardPagination.innerHTML = "";

        let page = new Pagination(tasks, taskContainer, boardPagination, 5, this.taskService.templateTask);
        page.pagination();

        this.modalOption(); 
    }

    printTask(){
        let buttons = Array.from(document.querySelectorAll(".board__filter-button"));
        let controller = TaskContainer.controller();

        buttons.forEach(button => {
            button.addEventListener("click", function(e){
                
                buttons.forEach(b => b.classList.remove("board__filter-button--selected"));
                button.classList.add("board__filter-button--selected");
                
                controller.setDate(e.target.textContent);
                controller.getTask(e.target.textContent);
                controller.checkTask();
                // controller.modalOption();
            });
        });
        
        buttons[0].click();
        buttons[0].classList.add("board__filter-button--selected");
    }

    getTaskByClick(){
        return new Promise((resolve, reject) => {
            
            let tasksPrints = document.querySelectorAll(".board__task");
            
            [...tasksPrints].forEach(task => {
                task.addEventListener("click", () => {
                    let id = task.dataset.id;
                    console.log(TaskContainer.service().getTaskById(id))
                    resolve(TaskContainer.service().getTaskById(id))
                });
            });
        })
    }

    checkTask(){
        let check = document.getElementById("taskContainer").querySelectorAll(".board__task-check");
        let service = TaskContainer.service();

        [...check].forEach(check => {
            check.addEventListener("change", function(e){
                let taskElement = e.target.closest(".board__task")
                let id = taskElement.dataset.id
                
                if(e.target.checked){
                    service.completeTask(id, true);
                    taskElement.classList.add("board__task--selected");
                } else {
                    service.completeTask(id, false);
                    taskElement.classList.remove("board__task--selected");
                }
            });
        })
    }

    updateTask(task){
        console.log(task)
        let inputName = document.getElementById("inputNameModal");
        let inputDate = document.getElementById("inputDateModal");
        let inputDescription = document.getElementById("inputDescriptionModal");

        let taskUpdate = TaskContainer.service().updateTask(task.id, inputName.value, inputDescription.value, inputDate.value)
        // controller.modalConfirm(service.getTaskById(id), "¡Tarea actualizada!");
        TaskContainer.controller().printTask();
        return taskUpdate;
    }

    deleteTask(task){
        let service = TaskContainer.service();
        let controller = TaskContainer.controller();

        service.deleteTask(task);
        controller.printTask();
    }

    // Funciones que crean modales y serán invocadas en los métodos de la clase Modal, de acuerdo a donde se necesite
    modalOption(){
        let modal = new Modal("opciones");
        modal.setTitle("Opciones tarea");
        [...document.querySelectorAll(".btn__list--edit")].forEach( btn => {
            modal.clickToOpen(btn, true);
        })
    }

    modalAdd(){
        let modal = new Modal("crear");
        modal.setTitle("Crear tarea");
        modal.setAction(this.addTask);
        modal.clickToOpen(document.getElementById("modalAddTask")); 
        //Una modal se puede abrir directamente con createModal() o usando el método clickToOpen para asignarlo un elemento el cuál al hacer click la abra
    }

    modalConfirm(task, message){
        let modal = new Modal("confirmar");
        modal.setTitle(message);
        modal.setInstance(task);
        modal.createModal();
    }

    modalUpdate(task){
        let modal = new Modal("actualizar");
        modal.setTitle("Actualizar tarea");
        modal.setInstance(task);
        modal.setAction(this.updateTask);
        modal.createModal();
        console.log(modal)
        let inputName = document.getElementById("inputNameModal");
        let inputDate = document.getElementById("inputDateModal");
        let inputDescription = document.getElementById("inputDescriptionModal");
        inputName.value = task.name;
        inputDate.value = task.dateFormat;
        inputDescription.value = task.description;
    }

    modalDelete(task){
        let modal = new Modal("eliminar");
        modal.setTitle("Eliminar tarea");
        modal.setInstance(task);
        modal.setAction(this.deleteTask);
        modal.createModal();
    }

    setDate(filter){
        let boardDate = document.querySelector(".board__date");
        let date = this.#taskService.getDate();
        let dateString = new Date().toDateString().split(" ")

        console.log(date);
        console.log(dateString)

        if(filter == "Día"){
            boardDate.querySelector("h3").textContent = dateString[0]
            boardDate.querySelector("h4").textContent = dateString[1] + " " + dateString[2] + ", " + dateString[3] 
        } else if(filter == "Semana"){

        } else if(filter == "Mes"){
            boardDate.querySelector("h3").textContent = dateString[1]
            boardDate.querySelector("h4").textContent = dateString[3]
        } else if(filter == "Año"){
            boardDate.querySelector("h3").textContent = dateString[3]
            boardDate.querySelector("h4").textContent =  "\u00A0"
        }
    }

    get taskService(){
        return this.#taskService;
    }

    init(){
        this.modalAdd();
        this.printTask();
        this.getTaskByClick();
    }
}