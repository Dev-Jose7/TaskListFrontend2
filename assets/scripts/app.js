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

    taskService.createTask(1, "Reunión con el equipo", "Discutir avances del proyecto y tareas pendientes", "2025-02-23");
taskService.createTask(1, "Comprar frutas", "Comprar manzanas, plátanos y naranjas", "2025-02-23");
taskService.createTask(1, "Revisar correos", "Revisar la bandeja de entrada y responder los más urgentes", "2025-02-23");
taskService.createTask(1, "Llamar al proveedor", "Llamar a la empresa para confirmar el envío", "2025-02-23");
taskService.createTask(1, "Leer artículo", "Leer el artículo sobre nuevas tecnologías", "2025-02-23");
taskService.createTask(1, "Hacer compras en línea", "Comprar ropa y artículos personales", "2025-02-24");
taskService.createTask(1, "Preparar presentación", "Crear la presentación para la reunión de mañana", "2025-02-24");
taskService.createTask(1, "Llamar a la mamá", "Ponerse al día con mamá y preguntar cómo está", "2025-02-24");
taskService.createTask(1, "Limpieza de cocina", "Ordenar y limpiar la cocina", "2025-02-24");
taskService.createTask(1, "Ir al gimnasio", "Entrenamiento en el gimnasio", "2025-02-24");
taskService.createTask(1, "Preparar almuerzo", "Cocinar algo rápido para el almuerzo", "2025-02-24");
taskService.createTask(1, "Escribir informe", "Redactar el informe de ventas del mes", "2025-02-25");
taskService.createTask(1, "Estudiar matemáticas", "Repasar ejercicios de álgebra y geometría", "2025-02-25");
taskService.createTask(1, "Revisar presupuesto", "Revisar los números y ajustar el presupuesto", "2025-02-25");
taskService.createTask(1, "Llamar al jefe", "Informar sobre el estado de las tareas", "2025-02-25");
taskService.createTask(1, "Llamar a un amigo", "Ponerse en contacto para coordinar una salida", "2025-02-25");
taskService.createTask(1, "Lavar ropa", "Poner una carga de ropa a lavar", "2025-02-25");
taskService.createTask(1, "Revisar redes sociales", "Ver las actualizaciones en las redes sociales", "2025-02-25");
taskService.createTask(1, "Cocinar cena", "Preparar una cena ligera y saludable", "2025-02-25");
taskService.createTask(1, "Ordenar escritorio", "Organizar el espacio de trabajo", "2025-02-26");
taskService.createTask(1, "Revisar proyectos", "Comprobar el progreso de los proyectos actuales", "2025-02-26");
taskService.createTask(1, "Hacer ejercicio matutino", "Sesión de estiramientos y yoga por la mañana", "2025-02-26");
taskService.createTask(1, "Leer libro", "Continuar leyendo el libro de ciencia ficción", "2025-02-26");
taskService.createTask(1, "Llamar a la familia", "Hacer una llamada grupal con los familiares", "2025-02-26");
taskService.createTask(1, "Visitar a un amigo", "Ir a la casa de un amigo para charlar", "2025-02-26");
taskService.createTask(1, "Organizar archivo", "Archivar documentos y limpiar la carpeta de escritorio", "2025-02-26");
taskService.createTask(1, "Revisar agenda", "Verificar las citas y compromisos para la semana", "2025-02-27");
taskService.createTask(1, "Revisar estadísticas", "Analizar los números de tráfico en el sitio web", "2025-02-27");
taskService.createTask(1, "Llamar al banco", "Consultar sobre el estado de la cuenta", "2025-02-27");
taskService.createTask(1, "Limpiar baño", "Limpiar los baños de la casa", "2025-02-27");
taskService.createTask(1, "Ver película", "Disfrutar de una película para relajarse", "2025-02-27");
taskService.createTask(1, "Preparar desayuno", "Hacer un desayuno saludable con avena y frutas", "2025-02-27");
taskService.createTask(1, "Arreglar coche", "Llevar el coche al mecánico para revisión", "2025-02-27");
taskService.createTask(1, "Realizar compras", "Ir al supermercado por productos esenciales", "2025-02-27");
taskService.createTask(1, "Escribir correo", "Redactar un correo importante a un cliente", "2025-02-28");
taskService.createTask(1, "Revisar notas", "Repasar las notas de la reunión anterior", "2025-02-28");
taskService.createTask(1, "Hacer tarea de química", "Realizar los ejercicios de la tarea de química", "2025-02-28");
taskService.createTask(1, "Revisar lista de pendientes", "Verificar todos los puntos de la lista de tareas", "2025-02-28");
taskService.createTask(1, "Llamar a la hermana", "Hablar con la hermana sobre el fin de semana", "2025-02-28");
taskService.createTask(1, "Tomar fotos", "Hacer una sesión de fotos para el portafolio", "2025-02-28");
taskService.createTask(1, "Escribir proyecto", "Redactar la propuesta para el nuevo proyecto", "2025-02-28");
taskService.createTask(1, "Verificar compras online", "Revisar los productos comprados por internet", "2025-02-28");





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