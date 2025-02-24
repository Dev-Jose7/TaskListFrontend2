import ListContainer from "../container/ListContainer.js";
import List from "../model/list.js";
import ListRepository from "../repository/ListRepository.js";

export default class ListService { 
    #listRepository = ListContainer.repository();

    constructor(){}

    createList(name){
        let list = new List(name);
        this.#listRepository.save(list);
    }

    getListAll(){
        console.log(this.#listRepository.findAll())
        return this.#listRepository.findAll();
    }

    getListById(id){
        return this.#listRepository.findById(id);
    }

    updateList(list, name){
        list.name = name;
        this.#listRepository.saveAll();  // Guardamos todas las listas después de actualizar
    }

    deleteList(list){
        this.#listRepository.remove(list);
    }

    templateList(array){
        let elemento = "";

        for (let i = 0; i < array.length; i++) {
            elemento += `
                <div class="board__list ${i == 0 ? "board__list--selected" : ""}" data-id=${array[i].id}>
                    <h4>${array[i].name}</h4>
                    <button class="btn btn__list--edit" title="Opciones">···</button>
                </div>`
            
        }

        return elemento;
    }
}
