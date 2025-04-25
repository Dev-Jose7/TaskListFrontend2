import List from "../model/list.js";

export default class ListRepository{
    #listArray = [];

    constructor(){
        this.initDB();
        this.restoreInstance();
    }

    save(list){
        if(!this.findById(list.id) && !this.findByName(list.name)){ // Verificar si la lista nueva ya esta almancenada
            this.#listArray.push(list);
            this.saveAll();
        }
    }

    saveAll(){
        sessionStorage.setItem("listDB", JSON.stringify(this.#listArray.map(list => (
            {
                id: list.id,
                name: list.name
            }
        ))));
    }

    findAll(){
        return this.#listArray;
    }

    findById(id){
        return this.#listArray.find(list => list.id == id);
    }

    findByName(name){
        return this.#listArray.find(list => list.name == name);
    }

    remove(list){
        let index = this.#listArray.indexOf(list);
        if(index !== -1){
            this.#listArray.splice(index, 1);
            this.saveAll();
        }
    }

    restoreInstance(){
        this.#listArray = []; // Se limpia el contenedor 
        let array = JSON.parse(sessionStorage.getItem("listDB"));
        for (const list of array) {
            if(!this.findById(list.id)){
                let object = new List(list.name); // Se instancian usando los objetos almacenados en sessionStorage
                object.id = list.id;
                this.#listArray.push(object);
            }
        }
    }

    initDB(){
        if(sessionStorage.getItem("listDB") == null){
            sessionStorage.setItem("listDB", "[]");
        }
    }
}