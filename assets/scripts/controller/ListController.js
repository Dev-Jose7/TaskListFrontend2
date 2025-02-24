import ListContainer from "../container/ListContainer.js";
import TaskContainer from "../container/TaskContainer.js";
import ListService from "../service/ListService.js";
import TaskService from "../service/TaskService.js";
import TaskController from "./TaskController.js";

export default class ListController {
    #listService = ListContainer.service();
    static #idList;

    constructor(){}

    addList(){
        let addList = document.getElementById("addList");
        let inputName = document.getElementById("inputNameList");

        addList.addEventListener("click", (e) => {
            e.preventDefault()
            this.#listService.createList(inputName.value);
            this.getList();
        });
    }

    getList(){
        let listContainer = document.getElementById("listContainer");
        let array = this.#listService.getListAll();
        console.log(array)
        ListController.#idList = array[0].id;

        this.setIdListTaskContainer();
        listContainer.innerHTML = this.#listService.templateList(array);
    }

    setIdListTaskContainer(){
        document.getElementById("taskContainer").dataset.idList = ListController.#idList;
    }

    getListByClick(){
        let setIdListTaskContainer = this.setIdListTaskContainer
        let array = document.querySelectorAll(".board__list");

        [...array].forEach(list => {
            list.addEventListener("click", function(){
                [...array].forEach(l => l.classList.remove("board__list--selected"));
                list.classList.add("board__list--selected");

                ListController.#idList = list.dataset.id;
                setIdListTaskContainer();
                TaskContainer.controller().printTask();
            });
        });
    }

    updateList(){
        let updateList = document.getElementById("addList");
        let inputName = document.getElementById("inputNameList");
        let id = this.getListByClick();
        console.log(id)

        updateList.addEventListener("click", (e) => {
            e.preventDefault()
            let list = this.#listService.getTaskById(id);
            this.#listService.updateList(list, inputName.value);
            this.getList();
        })
    }

    deleteList(){
        let deleteTask = document.getElementById("deleteList");
        let id = this.getListByClick();

        deleteTask.addEventListener("click", (e) => {
            e.preventDefault()
            let task = this.#listService.getTaskById(id);
            this.#listService.deleteTask(task);
            this.getList();
        })
    }

    init(){
        // this.addList();
        this.getList(); //Inicia
        this.getListByClick()
        this.setIdListTaskContainer();
        // this.updateList();
        // this.deleteList();
    }
}