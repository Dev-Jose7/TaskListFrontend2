import TaskController from "../controller/TaskController.js";
import TaskRepository from "../repository/TaskRepository.js";
import TaskService from "../service/TaskService.js";

export default class TaskContainer{
    constructor(){}

    static controller(){
        return new TaskController();
    }

    static service(){
        return new TaskService();
    }

    static repository(){
        return new TaskRepository()
    }
}