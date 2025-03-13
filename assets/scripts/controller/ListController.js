import ListContainer from "../container/ListContainer.js";
import TaskContainer from "../container/TaskContainer.js";
import Modal from "../UI/Modal.js";
import Pagination from "../UI/Pagination.js";

export default class ListController {
    #listService = ListContainer.service();
    #taskController = TaskContainer.controller();
    static #idList;

    constructor(){}

    addList(){
        let inputName = document.getElementById("inputNameModal");
        let list = this.#listService.createList(inputName.value);
        this.refreshList(list) // Aparte de iniciar el controlador de las listas también se utiliza para refrescarlas
        return list;
    }

    getList(index){
        let array = this.#listService.getListAll();
        let listContainer = document.getElementById("listContainer");
        let boardPaginationList = document.getElementById("boardPaginationList");
        ListController.#idList = array[index].id;
        this.setIdListTaskContainer();

        let page = new Pagination(array, listContainer, boardPaginationList, 8, this.#listService.templateList)
        page.pagination();

        Modal.initModal();
    }

    updateList(list){
        let inputName = document.getElementById("inputNameModal");
        let listUpdate = this.#listService.updateList(list.id, inputName.value);
        this.refreshList(listUpdate);
        return listUpdate;
    }

    deleteList(list){
        this.#listService.deleteList(list);
        this.init()
    }

    getListByClick(){
        return new Promise((resolve, reject) => {
            
            let listPrints = document.querySelectorAll(".board__list");
            
            [...listPrints].forEach(list => {
                list.addEventListener("click", () => {
                    ListController.#idList = list.dataset.id;
                    resolve(this.#listService.getListById(ListController.#idList));
                });
            });
        })
    }

    setIdListTaskContainer(){ // Establece una clave al atributo data-* con nombre idList al contenedor de tareas (taskContainer), esto permite que la capa de tareas (task) pueda imprimir tareas pertenecientes de la lista en el contenedor
        document.getElementById("taskContainer").dataset.idList = ListController.#idList;
    }

    selectList(index){ // Permite seleccionar la lista para posteriormente imprimir las tareas de dicha lista
        let array = document.querySelectorAll(".board__list");

        [...array].forEach(list => {
            list.addEventListener("click", () => {
                [...array].forEach(l => l.classList.remove("board__list--selected"));
                list.classList.add("board__list--selected");

                ListController.#idList = list.dataset.id;
                this.setIdListTaskContainer();
                this.#taskController.printTask();
            });
        });

        try {
            array[index].click();
        } catch (error) {
            
        }
    }

    getIndex(list){ // Obtiene el indice de la instancia entregada como argumento a la función para ser buscada entre todas las instancias retornando unicamente el indice (posición) de esta instancia entre todas 
        let array = this.#listService.getListAll();
        let i = 0;
        try {
            array.find((instance, index) => {
                if(instance.id == list.id){
                    i = index;
                }
            })
        } catch (error) {
            
        }
        return i
    }

    refreshList(list){ // Se usa para re imprimir las listas despues de haber sido creadas o eliminadas
        let index = this.getIndex(list);
        this.getList(index); 
        this.selectList(index);
    }

    init(){ // Se usa para iniciar el controlador de esta entidad y también para refrescar las instancias impresas 
        this.getList(0); //Inicia, se obtienen las listas y se ubica en la primera por defecto
        this.selectList(0); // Se imprimen las listas y se selecciona la primera
    }
}