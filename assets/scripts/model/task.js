export default class Task{
    static counterId = 0;

    #id;
    #idList
    #name;
    #description;
    #date;
    #status;

    constructor(idList, name, description, date){
        this.#id = ++Task.counterId;
        this.#idList = idList;
        this.#name = name;
        this.#description = description;
        this.#date = date;
        this.#status = false;
    }

    get id(){
        return this.#id;
    }

    get idList(){
        return this.#idList;
    }

    get name(){
        return this.#name;
    }

    get description(){
        return this.#description;
    }

    get date(){
        return this.#date;
    }

    get status(){
        return this.#status;
    }

    set id(id){
        this.#id = id;
    }

    set name(name){
        this.#name = name;
    }

    set description(description){
        this.#description = description;
    }

    set date(date){
        this.#date = date;
    }

    set status(status){
        this.#status = status;
    }
}