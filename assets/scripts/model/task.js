export default class Task {
    static counterId = 0;

    #id;
    #idList;
    #name;
    #description;
    #date;
    #status;

    constructor(idList, name, description, date) {
        this.#id = ++Task.counterId;
        this.#idList = idList;
        this.#name = name;
        this.#description = description;
        const [year, month, day] = date.split("-").map(num => parseInt(num, 10));
        this.#date = new Date(year, month - 1, day); 
        this.#status = false;
    }

    get id() {
        return this.#id;
    }

    get idList() {
        return this.#idList;
    }

    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    get date() {
        return this.#date;
    }

    get day() {
        return this.#date.getDate();
    }

    get month() {
        return this.#date.getMonth() + 1;  // Ajustamos porque `getMonth()` devuelve valores de 0-11
    }

    get year() {
        return this.#date.getFullYear();
    }

    get week() {
        const startDate = new Date(this.#date.getFullYear(), 0, 1);
        const days = Math.floor((this.#date - startDate) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + 1) / 7);
    }

    get status() {
        return this.#status;
    }

    set id(id) {
        this.#id = id;
    }

    set name(name) {
        this.#name = name;
    }

    set description(description) {
        this.#description = description;
    }

    set date(date) {
        const [year, month, day] = date.split("-").map(num => parseInt(num, 10));
        this.#date = new Date(year, month - 1, day);
    }

    get dateFormat() {
        const year = this.#date.getFullYear();
        const month = String(this.#date.getMonth() + 1).padStart(2, '0'); // Añadir 0 si es un mes de un solo dígito
        const day = String(this.#date.getDate()).padStart(2, '0'); // Añadir 0 si es un día de un solo dígito
        return `${year}-${month}-${day}`; // Formato yyyy-MM-dd
    }

    set status(status) {
        this.#status = status;
    }
}
