import TaskController from "../controller/TaskController.js";
import TaskRepository from "../repository/TaskRepository.js";
import TaskService from "../service/TaskService.js";

export default class TaskContainer {
    constructor() {}

    // Atributos privados estáticos para almacenar las instancias
    static controllerInstance = null;
    static serviceInstance = null;
    static repositoryInstance = null;

    // Getter para obtener la instancia de TaskController
    static controller() {
        if (!TaskContainer.controllerInstance) {
            TaskContainer.controllerInstance = new TaskController();
        }
        return TaskContainer.controllerInstance; // Devuelve la instancia única
    }

    // Getter para obtener la instancia de TaskService
    static service() {
        if (!TaskContainer.serviceInstance) {
            TaskContainer.serviceInstance = new TaskService();
        }
        return TaskContainer.serviceInstance; // Devuelve la instancia única
    }

    // Getter para obtener la instancia de TaskRepository
    static repository() {
        if (!TaskContainer.repositoryInstance) {
            TaskContainer.repositoryInstance = new TaskRepository();
        }
        return TaskContainer.repositoryInstance; // Devuelve la instancia única
    }
}

