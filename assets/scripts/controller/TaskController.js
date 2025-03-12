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

        this.modal();
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

    modal(){
        let modal = new Modal(true);
        modal.scanElement(() => { // Los elementos principales de taskList son el boton para crear una tarea [+ Tarea] y los botones de las opciones de las instancias impresas
            modal.clickToOpen(document.getElementById("modalAddButton")); // Creará una modal de tipo crear al hacer click en el botón con id: modalAddButton
            [...document.querySelectorAll(".modalOptionButton")].forEach(btn => { // Creará modales de tipo opciones a todas las instancias impresas al hacer click en el botón con clase: editTask
                modal.clickToOpen(btn, true);
            });
        });
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
        this.printTask();
        this.getTaskByClick();
    }
}