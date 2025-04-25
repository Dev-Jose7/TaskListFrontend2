export default class List{
    static counterId = 0;

    #id;
    #name;
    
    constructor(name){
        this.#id = ++List.counterId;
        this.#name = name;
    }

    get id(){
        return this.#id;
    }

    get name(){
        return this.#name;
    }

    set id(id){
        this.#id = id;
    }

    set name(name){
        this.#name = name;
    }
}