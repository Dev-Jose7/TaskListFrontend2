import List from "./model/list.js"
import Task from "./model/task.js"
import ListRepository from "./repository/ListRepository.js";
import TaskRepository from "./repository/TaskRepository.js";

let lista1 = new List("Diario");
let lista2 = new List("Trabajo");
let lista3 = new List("Estudio");

let tarea1 = new Task(1, "Entrenar", "Ir al gimnasio a las 2:00 pm", "2025-02-19");
let tarea2 = new Task(3, "Estudiar", " ", "2025-02-19");
let tarea3 = new Task(2, "Reunión", "Asistir a encuentro con socios", "2025-02-20");



let listRepository = new ListRepository();
let taskRepository = new TaskRepository();

listRepository.save(lista1);
listRepository.save(lista2);
listRepository.save(lista3);

console.log(listRepository.findAll())

taskRepository.save(tarea1);
taskRepository.save(tarea2);
taskRepository.save(tarea3);

console.log(taskRepository.findAll())

listRepository.remove(lista1);
console.log(listRepository.findAll())

taskRepository.remove(tarea1);
console.log(taskRepository.findAll())