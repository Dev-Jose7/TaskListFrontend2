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
    // taskService.createTask(1, "Reunión 11 AM" , "Cita con equipo en la sala de reuniones", "2025-02-22")

    taskService.createTask(1, "Comprar víveres", "Comprar comida y bebidas para la semana", "2025-02-23");
    taskService.createTask(1, "Llamar a la abuela", "Ver cómo está y ponernos al día", "2025-02-23");
    taskService.createTask(1, "Enviar reporte de ventas", "Enviar el informe del mes al equipo de marketing", "2025-02-23");
    taskService.createTask(1, "Revisión de código", "Revisar el código del proyecto y solucionar bugs", "2025-02-24");
    taskService.createTask(1, "Estudiar para examen", "Repasar las lecciones de la clase de historia", "2025-02-24");
    taskService.createTask(1, "Cita médica", "Revisión general con el doctor a las 4 PM", "2025-02-24");
    taskService.createTask(1, "Limpiar la casa", "Limpieza general de todos los espacios", "2025-02-25");
    taskService.createTask(1, "Llamada con cliente", "Discutir propuesta de colaboración con el cliente X", "2025-02-25");
    taskService.createTask(1, "Paseo con el perro", "Dar una vuelta al parque con el perro", "2025-02-25");
    taskService.createTask(1, "Hacer ejercicio", "Sesión de cardio en casa", "2025-02-26");



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