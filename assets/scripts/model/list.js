class List{
    static counterId = 0;
    static listArray = [];

    #id;
    #name;
    
    constructor(name){
        this.#id = counterId++;
        this.#name = name;
    }

    getId(){
        return this.#id;
    }

    getName(){
        return this.#name;
    }

    setId(id){
        this.#id = id;
    }

    setName(name){
        this.#name = name;
    }
}