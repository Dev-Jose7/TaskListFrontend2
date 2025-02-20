import List from "./model/list.js"
import Task from "./model/task.js"
import ListRepository from "./repository/ListRepository.js";
import TaskRepository from "./repository/TaskRepository.js";
import ListService from "./service/ListService.js";
import TaskService from "./service/TaskService.js";





let listRepository = new ListRepository();
let taskRepository = new TaskRepository();

let listService = new ListService(listRepository);  // Usamos 'ListService' con mayúscula
let taskService = new TaskService(taskRepository);

listService.createList("Diario");
listService.createList("Trabajo");
listService.createList("Estudio");

taskService.createTask(1, "Entrenar", "Ir al gimnasio a las 2:00 pm", "2025-02-19")
taskService.createTask(3, "Estudiar", " ", "2025-02-19");
taskService.createTask(2, "Reunión", "Asistir a encuentro con socios", "2025-02-20")

console.log(listService.getListAll());
console.log(taskService.getTaskAll());


// taskRepository.save(tarea1);
// taskRepository.save(tarea2);
// taskRepository.save(tarea3);

// console.log(taskRepository.findAll())

// listRepository.remove(lista1);
// console.log(listRepository.findAll())

// taskRepository.remove(tarea1);
// console.log(taskRepository.findAll())