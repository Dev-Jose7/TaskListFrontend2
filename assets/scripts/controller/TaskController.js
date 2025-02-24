import TaskContainer from "../container/TaskContainer.js";

export default class TaskController{
    #taskService = TaskContainer.service();
    #idTask;

    constructor(){}

    addTask(){
        let addTask = document.getElementById("addTask");
        let inputName = document.getElementById("inputNameTask");
        let inputDate = document.getElementById("inputDateTask")
        let inputDescription = document.getElementById("inputDescriptionTask");
        let idList = document.getElementById("taskContainer").dataset.idList;

        try {
            addTask.addEventListener("click", function(){
                let task = TaskContainer.service().createTask(idList, inputName.value, inputDescription.value, inputDate.value);
                TaskContainer.controller().modalConfirm(task, "¡Tarea creada con éxito!");
                TaskContainer.controller().printTask();
            })
        } catch (error) {
            
        }
    }

    getTask(filter){ //Se obtiene las tareas por el id de su lista y por el filtro de fecha
        let taskContainer = document.getElementById("taskContainer");
        let idList = document.getElementById("taskContainer").dataset.idList;
        let date = this.#taskService.getDate();
        let array = this.#taskService.getTasksByDate(date, filter, this.#taskService.getTaskByList(idList));
        console.log(array);

        taskContainer.innerHTML = ""
        taskContainer.innerHTML = this.#taskService.templateTask(array);
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
                controller.modalOption();
            });
        });
        
        buttons[0].click();
        buttons[0].classList.add("board__filter-button--selected");
    }

    getTaskByClick(){
        return new Promise((resolve, reject) => {
            let id = 0;
            let tasks = document.querySelectorAll(".board__task");
            
            [...tasks].forEach(task => {
                task.addEventListener("click", function(){
                    id = task.dataset.id;
                    console.log(TaskContainer.service().getTaskById(id))
                    resolve(id)
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

    updateTask(id){
        let updateTask = document.getElementById("updateTask");
        let inputName = document.getElementById("inputNameTask");
        let inputDate = document.getElementById("inputDateTask");
        let inputDescription = document.getElementById("inputDescriptionTask");
        let service = TaskContainer.service();
        let controller = TaskContainer.controller()

        updateTask.addEventListener("click", function(){
            service.updateTask(id, inputName.value, inputDescription.value, inputDate.value)
            controller.modalConfirm(service.getTaskById(id), "¡Tarea actualizada!");
            controller.printTask();
        })
    }

    deleteTask(task){
        let confirm = document.querySelector(".modal__footer");
        let service = TaskContainer.service();
        let controller = TaskContainer.controller();

        confirm.addEventListener("click", (e) => {
            if(e.target.id == "deleteTask" || e.target.classList.contains("fa-check")){
                service.deleteTask(task);
                controller.modalConfirm(task, "¡Tarea eliminada!");
                controller.printTask();
            } else if(e.target.id == "keepTask" || e.target.classList.contains("fa-times")){
                document.getElementById("modalTask").remove();
            }
        })
    }

    modalAdd(){
        let modalAddTask = document.getElementById("modalAddTask");
        let service = TaskContainer.service();
        let controller = TaskContainer.controller();

        modalAddTask.addEventListener("click", function(){
            document.getElementById("modal").innerHTML = service.templateModal("Crear", null);
            controller.addTask();
            controller.modalClose();
        })
    }

    modalUpdate(id){
        let updateTask = document.getElementById("updateTask");
        let service = TaskContainer.service();
        let controller = TaskContainer.controller()

        updateTask.addEventListener("click", function(){
            let task = service.getTaskById(id);
            document.getElementById("modal").innerHTML = service.templateModal("Actualizar", task);
            document.getElementById("inputDescriptionTask").value = task.description
            controller.updateTask(id);
            controller.modalClose();
        })
    }

    modalDelete(id){
        let deleteTask = document.getElementById("deleteTask");
        let service = TaskContainer.service();
        let controller = TaskContainer.controller();

        deleteTask.addEventListener("click", function(){
            let task = service.getTaskById(id);
            document.getElementById("modal").innerHTML = service.templateModal("Eliminar", task);
            controller.deleteTask(task);
            controller.modalClose();
        }) 
    }

    modalOption(){
        let editTask = document.getElementById("taskContainer").querySelectorAll(".btn__list--edit");
        let service = TaskContainer.service()
        let controller = TaskContainer.controller()

        try {
            [...editTask].forEach(btn => {
                btn.addEventListener("click", async function(){
                    let id = await controller.getTaskByClick();
                    let task = service.getTaskById(id)

                    document.getElementById("modal").innerHTML = service.templateModal("Opciones", task);
                    controller.modalUpdate(id);
                    controller.modalDelete(id);
                    controller.modalClose();
                })
            })
        } catch (error) {
            
        }
    }

    modalConfirm(task, action){
        console.log(task)
        document.getElementById("modal").innerHTML = this.#taskService.templateModal("Confirmar", task);
        document.getElementById("modal").querySelector("h3").textContent = action
        this.modalClose();

        setTimeout(() => {
            if(document.getElementById("modalTask")){
                document.getElementById("modalTask").remove();
            }
        }, 5000);
    }

    modalClose(){
        let btnClose = document.getElementById("modalTask").querySelector(".btn-close");
        btnClose.addEventListener("click", function(){
            document.getElementById("modalTask").remove();
        })
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

    init(){
        this.modalAdd();
        this.printTask();
        this.getTaskByClick();
    }
}