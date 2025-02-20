import Task from "../model/task.js";

export default class TaskService{
    #taskRepository;

    constructor(taskRepository){
        this.#taskRepository = taskRepository;
    }

    createTask(idList, name, description, date){
        let task = new Task(idList, name, description, date);
        this.#taskRepository.save(task);
    }

    getTaskAll(){
        let array = this.#taskRepository.findAll();
        console.log(array)
        let elemento = ``

        for (const task of array) {
            elemento += `
                <div class="board__task" data-id=${task.id}>
                    <input type="checkbox">
                    <div class="board__task-text">
                        <h4>${task.name}</h4>
                        <p>${task.description}</p>
                    </div>
                    <button class="btn btn__list--edit">···</button>
                </div>`
        }   

        return elemento
    }

    getTaskById(id){
        return this.#taskRepository.findById(id);
    }

    updateTask(task, name, description, date){
        task.name = name;
        task.description = description;
        task.date = date;
        this.#taskRepository.saveAll();
    }

    deleteTask(task){
        this.#taskRepository.remove(task);
    }
}