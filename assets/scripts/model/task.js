class Task{
    static counterId = 0;
    static taskArray = [];

    #id;
    #name;
    #description;
    #date;
    #status;

    constructor(name, description, date){
        this.#id = counterId++;
        this.#name = name;
        this.#description = description;
        this.#date = date;
        this.#status = false;
    }

    getId(){
        return this.#id;
    }

    getName(){
        return this.#name;
    }

    getDescription(){
        return this.#description;
    }

    getDate(){
        return this.#date;
    }

    getStatus(){
        return this.#status;
    }

    setId(id){
        this.#id = id;
    }

    setName(name){
        this.#name = name;
    }

    setDescription(description){
        this.#description = description;
    }

    setDate(date){
        this.#date = date;
    }

    setStatus(status){
        this.#status = status;
    }
}