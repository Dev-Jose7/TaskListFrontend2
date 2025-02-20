import List from "../model/list.js";

export default class ListService { 
    #listRepository

    constructor(listRepository){
        this.#listRepository = listRepository;
    }

    createList(name){
        let list = new List(name);
        this.#listRepository.save(list);
    }

    getListAll(){
        let array = this.#listRepository.findAll();
        let elemento = ``;

        for (const list of array) {
            elemento += `
                <div class="board__list board__list--selected" data-id=${list.id}>
                    <h4>${list.name}</h4>
                    <button class="btn btn__list--edit" title="Opciones">···</button>
                </div>`
        }

        return elemento;
        
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
}
