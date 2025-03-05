import TaskContainer from "../container/TaskContainer.js";
import Pagination from "../UI/Pagination.js";

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

    get taskService(){
        return this.#taskService;
    }

    // pagination(tasks){
    //     let taskContainer = document.getElementById("taskContainer");
    //     let counterTask = 0; // Contador para identificar la cantidad de tareas ya impresas 
        
    //     for (let i = 0; i < taskContainer.childNodes.length; i++) {
    //         let taskPage = []; // Arreglo que almacenará las tareas próximas a ser impresas

    //         for (let j = 0; j < 5; j++) { // Recorrerá un máximo de 5 veces para extrar las tareas usando el contador de tareas ya impresas
    //             if(counterTask + j < tasks.length){
    //                 taskPage.push(tasks[counterTask + j]);
    //             }
    //         }
            
    //         taskContainer.childNodes[i].innerHTML = this.#taskService.templateTask(taskPage);
    //         taskContainer.childNodes[i].style.display = "none";
    //         counterTask += 5;  // Suma el contador una vez haya extraido 5 tareas

    //         if(counterTask < tasks.length){
    //             this.createPage(taskContainer);
    //         }
    //     }
    //     taskContainer.childNodes[0].style.display = "flex";
    //     this.paginationButtons();
    // }

    // paginationButtons(){
    //     let taskContainer = document.getElementById("taskContainer");
    //     let boardPagination = document.getElementById("pageTask");
    //     boardPagination.innerHTML = "";

    //     for (let i = 0; i < taskContainer.childNodes.length; i++) {
    //         let button = document.createElement("BUTTON");
    //         button.textContent = i + 1;
    //         button.classList.add("btn", "btn__page")
    //         boardPagination.appendChild(button);

    //         button.addEventListener("click", function(e){
    //             [...taskContainer.childNodes].forEach((page, index) => {
    //                 page.style.display = "none"
    //                 boardPagination.childNodes[index].classList.remove("btn__page--selected");
    //             })

    //             taskContainer.childNodes[e.target.textContent - 1].style.display = "flex";
    //             boardPagination.childNodes[e.target.textContent - 1].classList.add("btn__page--selected");
    //         });
    //     }

    //     boardPagination.childNodes[0].classList.add("btn__page--selected")
    // }

    // createPage(element){
    //     let page = document.createElement("DIV");
    //     element.appendChild(page);
    //     page.classList.add("board__content--page");
    // }

    pagination(tasks){ // Crea los botones de acuerdo a la cantidad de páginas
        let totalPages = Math.ceil((tasks.length == 0 ? 1 : tasks.length) / 5);
        let boardPagination = document.getElementById("pageTask");
        let mainPagination = document.createElement("DIV")
        mainPagination.id = "mainPagination"

        boardPagination.innerHTML = ""
        boardPagination.appendChild(mainPagination)

        // if(totalPages > 5){
        //     this.paginationButtons(tasks, totalPages, 1);
        // } else {
        //     this.createButtons(tasks, totalPages, mainPagination);
        //     this.createNextPrev(mainPagination);
        //     mainPagination.childNodes[0].classList.add("btn__page--selected")
        // }

        if(totalPages > 5){
            this.paginationButtons1(tasks, totalPages, 0);
            this.createNextPrev(mainPagination, true);
        } else {
            this.createButtons(tasks, totalPages, mainPagination);
            this.createNextPrev(mainPagination, true);
            
        }
        
        this.printPage(tasks, 1);
        mainPagination.childNodes[0].classList.add("btn__page--selected")
    }

    createButtons(tasks, totalPages, container){
        let controller = TaskContainer.controller();
        let boardPagination = document.getElementById("pageTask")
        let mainPagination = document.getElementById("mainPagination")

        console.log(totalPages)
        for (let i = 0; i < totalPages; i++) {
            let button = document.createElement("BUTTON");
            button.textContent = i + 1;
            button.classList.add("btn", "btn__page")
            container.appendChild(button);
        }
        
        console.log(container.childNodes);
        [...container.childNodes].forEach((button, index) => {
            button.addEventListener("click", function(e){
                controller.printPage(tasks, e.target.textContent);

                // if(totalPages > 5){ // Abrevia los botones en caso de ser 5 botones o más
                //     controller.paginationButtons(tasks, totalPages, e.target.textContent);
                // }

                [...mainPagination.childNodes].forEach(button => {
                    button.classList.remove("btn__page--selected")
                });

                console.log(e.target.textContent)
                console.log(mainPagination.childNodes.length)
                console.log(e.target == mainPagination.childNodes[0])
                

                if(totalPages > 5 && e.target.textContent != 1 && e.target.textContent != container.childNodes.length){
                    
                    
                    console.log(container.childNodes.length)
                    
                    if(e.target == mainPagination.childNodes[mainPagination.childNodes.length-1]){
                        controller.paginationButtons1(tasks, totalPages, +e.target.textContent-1);
                        console.log(container.childNodes)
                        mainPagination.childNodes[0].classList.add("btn__page--selected")
                    }
                    console.log(e.target == mainPagination.childNodes[0])
                    console.log(e.target)
                    console.log(mainPagination.childNodes[0])
                    
                    if(e.target == mainPagination.childNodes[0]){
                        controller.paginationButtons1(tasks, totalPages, (+e.target.textContent-5));
                        mainPagination.childNodes[e.target.textContent-1].classList.add("btn__page--selected")
                    }

                    // Condición para quitar el seleccionado de todos los botones boardPagination
                    
                    
                }
                
                [...container.childNodes].forEach(btn => {
                    btn.classList.remove("btn__page--selected")
                })

                button.classList.add("btn__page--selected")
            });

        });
    }

    // createNextPrev(mainPagination){
    //     let boardPagination = document.getElementById("pageTask")
    //     let nextButton = document.createElement("BUTTON")
    //     let prevButton = document.createElement("BUTTON")
    //     let counterPage = 0
        
    //     // Limpia los botones para evitar duplicados
    //     if(document.querySelectorAll(".btn__page--move")){
    //         [...document.querySelectorAll(".btn__page--move")].forEach(button => {
    //             button.remove();
    //         })
    //     }
    
    //     nextButton.classList.add("btn", "btn__page", "btn__page--move");
    //     prevButton.classList.add("btn", "btn__page", "btn__page--move")
    //     nextButton.textContent = ">";
    //     prevButton.textContent = "<";

    //     boardPagination.prepend(prevButton);
    //     boardPagination.appendChild(nextButton);

    //     prevButton.addEventListener("click", function(){
    //         console.log(counterPage)
    //         if(counterPage > 0){
    //             counterPage--
    //             mainPagination.childNodes[counterPage].click()
                
    //             console.log(mainPagination.childNodes[counterPage])
    //             console.log(counterPage)
    //         }
    //     });

    //     nextButton.addEventListener("click", function(){
    //         console.log(mainPagination)
    //         console.log("Length: ", mainPagination.childNodes.length)
    //         if(counterPage < mainPagination.childNodes.length-1){
    //             counterPage++
    //             mainPagination.childNodes[counterPage].click()
                
    //             console.log(mainPagination.childNodes[counterPage])
    //             console.log(counterPage)
    //         }
    //     });

        
    // }

    createNextPrev(mainPagination, full){

    

        console.log("Length: ", mainPagination.childNodes.length)
        // Limpia los botones para evitar duplicados
        if(document.querySelectorAll(".btn__page--move")){
            [...document.querySelectorAll(".btn__page--move")].forEach(button => {
                button.remove();
            })
        }

        let boardPagination = document.getElementById("pageTask")
        let nextButton = document.createElement("BUTTON")
        let prevButton = document.createElement("BUTTON")
        let counterIndex = 0
    
        nextButton.classList.add("btn", "btn__page", "btn__page--move");
        prevButton.classList.add("btn", "btn__page", "btn__page--move")
        nextButton.textContent = ">";
        prevButton.textContent = "<";

        boardPagination.prepend(prevButton);
        boardPagination.appendChild(nextButton);

        prevButton.addEventListener("click", function(){
            console.log(counterIndex)
            if(counterIndex == 0 && full == false){
                counterIndex = 5-1
            }

            
                counterIndex--
                mainPagination.childNodes[counterIndex].click()
            

            // [...mainPagination.childNodes].forEach(button => {
            //     button.addEventListener("click", function(){
            //         counterPage = button.textContent-1;
            //     })
            // })
        });

        

        nextButton.addEventListener("click", function(){
            console.log(counterIndex)
            console.log(mainPagination.childNodes.length-1)
            console.log(mainPagination)
            if(counterIndex < mainPagination.childNodes.length-1){
                
                counterIndex++
                console.log(counterIndex)
                mainPagination.childNodes[counterIndex].click();
            }

            // [...mainPagination.childNodes].forEach(button => {
            //     button.addEventListener("click", function(){
            //         counterPage = button.textContent-1;
            //     })
            // })
        });

        
        
    }

    printPage(tasks, page){ // Imprime las tareas de la página correspondiente
        let taskContainer = document.getElementById("taskContainer");
        let counterTask = (+page * 5) - 5
        let taskPage = [];

        for (let i = 0; i < 5; i++) { // Recorrerá un máximo de 5 veces para extrar las tareas usando el contador de tareas ya impresas
            if(counterTask + i < tasks.length){
                taskPage.push(tasks[counterTask + i]);
            }
        }

        taskContainer.innerHTML = ""
        taskContainer.innerHTML = this.#taskService.templateTask(taskPage);
        this.modalOption();
    }

    // paginationButtons(tasks, totalPages, numberPage){
    //     let boardPagination = document.getElementById("pageTask");
    //     let counterButton = 0;
    //     let container = document.createElement("DIV");
    //     let buttonPage = [];
        
    //     boardPagination.innerHTML = ""
    //     this.createButtons(tasks, totalPages, container);
        

    //     let lengthContainer = container.childNodes.length
    //     let firstButton = container.childNodes[0];
    //     let lastButton = container.childNodes[lengthContainer-1]
    //     let buttonContainer = document.createElement("DIV");
    //     buttonContainer.classList.add("board__pagination--page")
    //     let prev = document.createElement("P")
    //     let next = document.createElement("P")
    //     prev.innerHTML = "...";
    //     next.innerHTML = "...";

        

    //     //Evita salirse de los indice de arreglo de botones al usar firstButton y lastButton
    //     if(numberPage != 1 && numberPage != lengthContainer){
    //         counterButton = numberPage - 2
    //     } else if(numberPage == lengthContainer){
    //         counterButton = numberPage - 3
    //     }
        
    //     for (let i = 0; i < 3; i++) {
    //         if(counterButton == 0){
    //             counterButton++;
    //         } else if(counterButton == lengthContainer-3){
    //             counterButton--;
    //         }

    //         buttonPage.push(container.childNodes[counterButton + i])
    //     }
        

    //     if(numberPage != 1 && numberPage != lengthContainer){
    //         counterButton = numberPage - 2
    //     } else if(numberPage == lengthContainer){
    //         counterButton = numberPage - 3
    //     }
        
    //     for (let i = 0; i < 3; i++) {
    //         if(counterButton == 0){
    //             counterButton++;
    //         } else if(counterButton == lengthContainer-3){
    //             counterButton--;
    //         }

    //         buttonPage.push(container.childNodes[counterButton + i])
    //     }

    //     buttonPage.forEach(button => {
    //         buttonContainer.appendChild(button);
            
    //     })
        
    //     boardPagination.appendChild(firstButton);
    //     boardPagination.appendChild(buttonContainer);
    //     boardPagination.appendChild(lastButton);

        
        
    //     if(numberPage < lengthContainer-2){ 
    //         buttonContainer.appendChild(next)
    //     } 

    //     if(numberPage > 3){
    //         buttonContainer.prepend(prev);
    //     }
    // }

    paginationButtons(tasks, totalPages, numberPage){
        let boardPagination = document.getElementById("pageTask");
        let mainPagination = document.getElementById("mainPagination")
        let container = document.createElement("DIV");
        let firstContainer = document.createElement("DIV");
        let lastContainer = document.createElement("DIV");
        let buttonContainer = document.createElement("DIV");
        let dots1 = document.createElement("P")
        let dots2 = document.createElement("P")
        dots1.textContent = "...";
        dots2.textContent = "...";
        let counterButton = 0;
        let buttonPage = [];
    
        this.createButtons(tasks, totalPages, container);
        let lengthContainer = container.childNodes.length
        let firstButton = container.childNodes[0];
        let lastButton = container.childNodes[lengthContainer-1]
        
        firstContainer.classList.add("board__pagination--page")
        buttonContainer.classList.add("board__pagination--page")
        lastContainer.classList.add("board__pagination--page");

        if(numberPage){ // Condición para quitar el seleccionado de todos los botones boardPagination
            [...mainPagination.childNodes].forEach(element => {
                if(element.tagName == "DIV"){
                    [...element.childNodes].forEach(button => {
                        button.classList.remove("btn__page--selected")
                    })
                }
            });
        }

        container.childNodes[numberPage-1].classList.add("btn__page--selected")

        if (numberPage == 1 || numberPage == 4){
            counterButton = 0
            createContainers(firstContainer, 0)
            mainPagination.innerHTML = "";
            mainPagination.appendChild(firstContainer);
            mainPagination.appendChild(buttonContainer.appendChild(dots1));
            mainPagination.appendChild(lastContainer.appendChild(lastButton));
        } 

        if (numberPage >= 5 && numberPage <= (lengthContainer - 4)){
            counterButton = numberPage - 2;
            createContainers(buttonContainer, 1)
            console.log("Entro")
            
            mainPagination.innerHTML = ""
            
            firstContainer.appendChild(firstButton)
            firstContainer.appendChild(dots1)

            lastContainer.appendChild(lastButton)
            lastContainer.prepend(dots2)

            mainPagination.prepend(firstContainer)
            mainPagination.appendChild(buttonContainer);
            mainPagination.appendChild(lastContainer);
        }
        
        if (numberPage == lengthContainer || numberPage == (lengthContainer - 3)){
            counterButton = lengthContainer - 5;
            createContainers(lastContainer, 0)
            
            mainPagination.innerHTML = "";
            mainPagination.prepend(firstContainer.appendChild(firstButton))
            mainPagination.appendChild(buttonContainer.appendChild(dots2))
            mainPagination.appendChild(lastContainer);
        }

        if(numberPage == 1){
            this.createNextPrev(firstContainer);
        } else if(numberPage >= 5 && numberPage <= (lengthContainer-4)){
             this.createNextPrev(buttonContainer);
        } else if(numberPage == lengthContainer-3){
             this.createNextPrev(lastContainer);
        }


        function createContainers(div, type){
            let cantButton = 0
            type ? cantButton = 3 : cantButton = 5
            for (let i = 0; i < cantButton; i++) {
                buttonPage.push(container.childNodes[counterButton + i])
            }
            
            buttonPage.forEach(button => {
                div.appendChild(button)
            });
        }
    }
    
    paginationButtons1(tasks, totalPages, numberPage){
        let mainPagination = document.getElementById("mainPagination")
        let container = document.createElement("DIV");
        let buttonContainer = document.createElement("DIV");
        let buttonPage = []

        

        // container.childNodes[numberPage-1].classList.add("btn__page--selected")

        mainPagination.innerHTML = ""
        this.createButtons(tasks, totalPages, container);
        console.log(container)
        console.log(totalPages)
        console.log(numberPage)
        
        for (let i = 0; i < 5; i++) {
            if(container.childNodes[i + (numberPage)] != null){
                buttonPage.push(container.childNodes[i + (numberPage)])
            }
        }

        console.log(numberPage)
        console.log(buttonPage)

        buttonPage.forEach(button => {
            mainPagination.appendChild(button)
            this.createNextPrev(mainPagination, false);
        })

        console.log(mainPagination)

    }

    init(){
        this.modalAdd();
        this.printTask();
        this.getTaskByClick();
    }
}