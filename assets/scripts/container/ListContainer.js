import ListController from "../controller/ListController.js";
import ListRepository from "../repository/ListRepository.js";
import ListService from "../service/ListService.js";

export default class ListContainer {
    constructor() {}

    // Atributos privados estáticos para almacenar las instancias
    static controllerInstance = null;
    static serviceInstance = null;
    static repositoryInstance = null;

    // Getter para obtener la instancia de TaskController
    static controller() {
        if (!ListContainer.controllerInstance) {
            ListContainer.controllerInstance = new ListController();
        }
        return ListContainer.controllerInstance; // Devuelve la instancia única
    }

    // Getter para obtener la instancia de TaskService
    static service() {
        if (!ListContainer.serviceInstance) {
            ListContainer.serviceInstance = new ListService();
        }
        return ListContainer.serviceInstance; // Devuelve la instancia única
    }

    // Getter para obtener la instancia de TaskRepository
    static repository() {
        if (!ListContainer.repositoryInstance) {
            ListContainer.repositoryInstance = new ListRepository();
        }
        return ListContainer.repositoryInstance; // Devuelve la instancia única
    }
}