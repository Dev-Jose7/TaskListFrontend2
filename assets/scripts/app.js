import ListController from "./controller/ListController.js";
import TaskController from "./controller/TaskController.js";
import ListRepository from "./repository/ListRepository.js";
import TaskRepository from "./repository/TaskRepository.js";
import ListService from "./service/ListService.js";
import TaskService from "./service/TaskService.js";

    

    let listController = new ListController();
    let taskController = new TaskController();

    let listService = new ListService();  // Usamos 'ListService' con mayúscula
    let taskService = new TaskService();

    listService.createList("Diario");
    listService.createList("Trabajo");

    // taskService.createTask(1, "Ir al Gimnasio", "", "2025-02-22");
    // taskService.createTask(2, "Reunión 11 AM" , "Cita con equipo en la sala de reuniones", "2025-02-22")

    // taskService.getTaskAll();
    // listService.getListAll();

    listController.init();
    taskController.init();

    

// Cierre de modal
// let buttonClose = document.querySelectorAll(".btn-close");

// [...buttonClose].forEach(btn => {
//     btn.addEventListener("click", function(){
//         let array = document.querySelectorAll(".modal__container");
//         [...array].forEach(modal => {
//             modal.remove();
//         })
//     });
// })


// Apertura de modal Crear


// let listTask = document.getElementById("modalAddListForm")

// listTask.addEventListener("click", function(){
//     let modal = document.getElementById("modalAddList");
//     console.log(modal)
//     modal.style.display = "flex"
// })

// Opciones lista

// let buttonListOption = document.querySelectorAll(".btn__list--edit");

// [...buttonListOption].forEach(btn => {
//     btn.addEventListener("click", function(){
//         let modal = document.getElementById("modalUpdateList");
//         modal.style.display = "flex"
//     });
// })

// let updateListModal = document.getElementById("updateList")
// updateListModal.addEventListener("click", function(){
//     let modal = document.getElementById("modalAddList");
//     console.log(modal)
//     modal.style.display = "flex"
// })

// listService.createList("Diario");
// listService.createList("Trabajo");
// listService.createList("Estudio");

// taskService.createTask(1, "Entrenar", "Ir al gimnasio a las 2:00 pm", "2025-02-19")
// taskService.createTask(3, "Estudiar", " ", "2025-02-19");
// taskService.createTask(2, "Reunión", "Asistir a encuentro con socios", "2025-02-20")


// console.log(listService.getListAll());
// console.log(taskService.getTaskAll());


// taskRepository.save(tarea1);
// taskRepository.save(tarea2);
// taskRepository.save(tarea3);

// console.log(taskRepository.findAll())

// listRepository.remove(lista1);
// console.log(listRepository.findAll())

// taskRepository.remove(tarea1);
// console.log(taskRepository.findAll())