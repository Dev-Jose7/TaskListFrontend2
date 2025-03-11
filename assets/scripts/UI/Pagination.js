
import TaskContainer from "../container/TaskContainer.js";

export default class Pagination{
    static counterId = 0;
    taskController = TaskContainer.controller(); // Se crea de acuerdo al contexto, atributo que esta por defecto
    

    constructor(data, dataContainer, buttonContainer, sizePage, printData){
        this.id = ++Pagination.counterId;
        this.data = data;
        this.dataContainer = dataContainer;
        this.buttonContainer = buttonContainer;
        this.sizePage = sizePage;
        this.printData = printData;
        this.totalPages;
        this.startShort = false; // Indica si la paginación se ha abreviado (cortado)
        this.prev = false; // Indica si la paginación esta yendo hacias atrás
        this.next = false // Indica si la paginación esta yendo hacias adelante
        this.firstButtons = false; // Indica si el primer grupo de botones fueron creados
        this.lastButtons = false // Indica si el último grupo de botones fueron creados
        this.indexFirst = false; // Indica si el primer boton ha recibido click
        this.indexLast = false; // Indica si el último boton ha recibido click
         
        this.idTask = 0;
    }

    pagination(){ // Inicia la paginación creando los botones de acuerdo a la cantidad de páginas
        this.totalPages = Math.ceil((this.data.length == 0 ? 1 : this.data.length) / this.sizePage);
        let mainPagination = document.createElement("DIV")
        mainPagination.id = `mainPagination${this.id}`

        this.buttonContainer.innerHTML = ""
        this.buttonContainer.appendChild(mainPagination);

        if(this.totalPages > 5){
            this.shortPagination(0);
        } else {
            this.createButtons(mainPagination);
        }
        
        this.printPage(1);
        this.createNextPrev(mainPagination, 0);
        
        try {
            mainPagination.childNodes[0].classList.add("btn__page--selected")
        } catch (error) {
            
        }
        
    }

    createButtons(container){ // Se encarga de crear los botones de acuerdo a la cantidad de paginas calculados por el método pagination
        let mainPagination = document.getElementById(`mainPagination${this.id}`);
        
        for (let i = 0; i < this.totalPages; i++) {
            let button = document.createElement("BUTTON");
            button.textContent = i + 1;
            button.classList.add("btn", "btn__page")
            container.appendChild(button);
        }

        [...container.childNodes].forEach((button, index) => {
            button.addEventListener("click", (e) => {
                this.printPage(e.target.textContent);
                this.taskController.modal();

                [...mainPagination.childNodes].forEach(button => {
                    button.classList.remove("btn__page--selected")
                });

                if(this.totalPages > 5){
                    // Hace referencia al último boton de mainPagination
                    // Si el elemento clickeado es igual que al ultimo nodo hijo de mainPagination y
                    // El texto del elemento clickeado es diferente al total de paginas
                    if(e.target == mainPagination.childNodes[mainPagination.childNodes.length-1] && e.target.textContent != this.totalPages){
                        this.startShort = true;
                        this.firstButtons = false;
                        this.shortPagination(e.target.textContent-2) //Pasa el total de paginas y el texto del boton menos 3, ya que este será un indice para el arreglo Container de shortPagination
                        mainPagination.childNodes[1].classList.add("btn__page--selected")
                    }

                    //Hace referencia al primer botón de mainPagination
                    //Si el elemento clikeado es igual que al primer hijo nodo de mainPagination y
                    //El texto de este botón es diferente a uno
                    if(e.target == mainPagination.childNodes[0] && e.target.textContent != 1){
                        this.startShort = true;
                        this.lastButtons = false;
                        this.shortPagination((e.target.textContent-2)); //Pasa el total de paginas y el texto del boton menos 3, ya que este será un indice para el arreglo Container de shortPagination
                        mainPagination.childNodes[mainPagination.childNodes.length-2].classList.add("btn__page--selected")
                    }
                }
                
                button.classList.add("btn__page--selected")
                
            });
        });
    }

    createNextPrev(mainPagination, index) { // Crea los botones de desplazamiento (< >)
        // Limpia los botones de 'next' y 'prev' para evitar duplicados
        let moveButtons = document.querySelectorAll(`.btn__page--move${this.id}`);
        if (moveButtons.length > 0) {
            moveButtons.forEach(button => button.remove());
        }
    
        let nextButton = document.createElement("BUTTON");
        let prevButton = document.createElement("BUTTON");

        // Si se crean los primeros 5 botones y la paginación va en reversa (click [<]) el index iniciará en 3 para que el regreso continúe
        if(this.firstButtons && this.prev){
            index = 3;
        }

        // Si se hace click en el primer boton cuando la paginación este abreviada, el index inicia en cero para que su avance sea continúo
        if(this.indexFirst){
            index = 0;
        }

        // Si la paginación está abreviada y se esta avanzando (click [>])  o retrocediendo (click [<]) el index empieza en 1 para un desplazamiento continúo
        if(this.startShort && this.prev || this.startShort && this.next){
            index = 1
        }

        // / Si se crean los ultimos 5 botones y la paginación va en reversa (click [>]) el index iniciará en 4 para que el avance continúe
        if(this.indexLast){
            index = 4
        }

        // Clases y texto para los botones
        nextButton.classList.add("btn", "btn__page--move", `btn__page--move${this.id}`);
        prevButton.classList.add("btn", "btn__page--move", `btn__page--move${this.id}`);
        nextButton.textContent = ">";
        prevButton.textContent = "<";
    
        // Agregar los botones al DOM
        this.buttonContainer.prepend(prevButton);
        this.buttonContainer.appendChild(nextButton);
    
        // Función para manejar el clic en el botón "prev"
        prevButton.addEventListener("click", () => {
            this.prev = true;
            this.next = false;
            // this.firstButtons ? counterIndex = 3 : counterIndex;
            if (index > 0) {
                index--;  // Mover hacia la página anterior
                mainPagination.children[index].click();  // Simula un clic en el botón de la página anterior
            }
        });
    
        // Función para manejar el clic en el botón "next"
        nextButton.addEventListener("click", () => {
            this.next = true;
            this.prev = false;
            if (index < mainPagination.children.length - 1) {
                index++;  // Mover hacia la página siguiente
                mainPagination.children[index].click();  // Simula un clic en el botón de la siguiente página
            }
        });
    
        // Añadir los eventos de clic a los botones de paginación
        [...mainPagination.children].forEach((button, i) => {
            button.addEventListener("click", () => {
                index = i;  // Actualiza el índice con el botón clickeado
            });
        });
    }

    printPage(page){ // Imprime los datos de la página recibida en el parametro page
        let indexData = (+page * this.sizePage) - this.sizePage; // Se ubicará en el objeto exacto para empezar a llenar la pagina
        let pageData = [];

        for (let i = 0; i < +this.sizePage; i++) { // Recorrerá según el tamaño de página para extrar las tareas usando el indexData
            if(indexData + i < this.data.length){
                pageData.push(this.data[indexData + i]);
            }
        }

        this.dataContainer.innerHTML = ""
        this.dataContainer.innerHTML = this.printData(pageData)
    }

    // Se encarga de abreviar la páginación
    shortPagination(indexButton){ // indexButton hace referencia al indice del boton (de container) desde donde se extraerán los botones a insertar
        let mainPagination = document.getElementById(`mainPagination${this.id}`);
        let container = document.createElement("DIV");
        let buttonPage = []

        let index = this.startShort ? 3 : 5 // Permite generar 5 botones cuando se encuentre en los primeros 5 botones y mientras se avanza solo 3 botones
       
        mainPagination.innerHTML = "";
        this.createButtons(container);

        // indexButton es cero cuando se carga la paginación por primer vez, si se hace click en el primer botón (1) se creará el último
        if(indexButton == 0 || this.indexFirst){
            if(!document.getElementById(`containerLastButton${this.id}`)){
                this.createFirstLastButtons(container, "last");
            }
        }

        // Si se hace click en el ultimo boton ej (11) creará el primer boton (1)
        if(this.indexLast){ 
            console.log(container)
            if(!document.getElementById(`containerFirstButton${this.id}`)){
                this.createFirstLastButtons(container, "first");
            }
        }

        // Crea el primer botón y último cuando la paginación se abrevia (corta)
        if(this.startShort){
            if(!document.getElementById(`containerFirstButton${this.id}`)){
                this.createFirstLastButtons(container, "first");
            }

            if(!document.getElementById(`containerLastButton${this.id}`)){
                this.createFirstLastButtons(container, "last");
            }
        }

        // Creará al último grupo de 5 botones ej: (7, 8, 9, 10, 11)
        if(this.next && indexButton == container.childNodes.length-5 || indexButton == container.childNodes.length-5 ||
            this.indexLast){ // Si se hace click en el 8 boton
            index = 5;
            this.startShort = false;
            this.lastButtons = true;
            // document.getElementById("containerFirstButton").remove();
            document.getElementById(`containerLastButton${this.id}`).remove();
        }

        // Creará al primer grupo de 5 botones (1, 2, 3, 4, 5)
        if(this.prev && indexButton == 2 || indexButton == 2){ // Si se hace click en el 4 buton
            index = 5
            indexButton = 0;
            this.startShort = false;
            this.firstButtons = true;
            document.getElementById(`containerFirstButton${this.id}`).remove();
            // document.getElementById("containerLastButton").remove();
        }

        // Corregirá el indexButton cuando se acceda a los últimos 5 botones mediante el ultimo botón,
        // Esto debido ya que container contará con 8 botones en lugar de 6 por el corte de la paginación que solo toma tres botones
        if(this.indexLast && !this.startShort && indexButton == container.childNodes.length-3){
            indexButton = indexButton-2
        }

        // console.log("indexLast:", this.indexLast);
        // console.log("indexFirst:", this.indexFirst);
        // console.log("index: ", index)
        // console.log("indexButton: ", indexButton);
        // console.log(" ");

        for (let i = 0; i < index; i++) {
            console.log("En el for: ", container.childNodes[i + (indexButton)])
            if(container.childNodes[i + (indexButton)] != null){ //Extraerá todos los botones del container de acuerdo al indice obtenido (número botón menos 3 para que el boton seleccionado se ubique a la mitad)
                buttonPage.push(container.childNodes[i + (indexButton)])
            }
        }

        buttonPage.forEach(button => {
            mainPagination.appendChild(button)
        })


        if(this.indexFirst){
            mainPagination.childNodes[0].classList.add("btn__page--selected")
        }

        if(this.indexLast){
            mainPagination.childNodes[mainPagination.childNodes.length-1].classList.add("btn__page--selected")
        }

        // Una vez creados y añadidos los botones a mainPagination se crean los botones de desplazamiento y se añade eventos de tipo click a los botones despúes de abreviar la paginación
        this.createNextPrev(mainPagination, 1);
    }

    createFirstLastButtons(container, type){ // Crea el primer y/o el ultimo boton de la paginación de acuerdo a la posición del usuario (determinado en shortPagination)
        let firstButton = document.createElement("BUTTON");
        let lastButton = document.createElement("BUTTON");

        if(type == "first"){
            let containerFirstButton = document.createElement("DIV");
            let dotsFirst = document.createElement("P");
            firstButton.textContent = 1;
            containerFirstButton.id = `containerFirstButton${this.id}`;
            dotsFirst.textContent = "...";
            firstButton.classList.add("btn", "btn__page");
            containerFirstButton.prepend(firstButton);
            containerFirstButton.appendChild(dotsFirst);
            this.buttonContainer.prepend(containerFirstButton);
        }

        if(type == "last"){
            let containerLastButton = document.createElement("DIV");
            let dotsLast = document.createElement("P");
            lastButton.textContent = container.childNodes.length;

            console.log(container.childNodes.length)
            containerLastButton.id = `containerLastButton${this.id}`
            dotsLast.textContent = "...";
            lastButton.classList.add("btn", "btn__page");
            containerLastButton.prepend(dotsLast);
            containerLastButton.appendChild(lastButton);
            this.buttonContainer.appendChild(containerLastButton);
        }

        firstButton.addEventListener("click", () => {
            this.startShort = false;
            this.indexFirst = true;
            this.shortPagination(2);
            this.printPage(firstButton.textContent)
            this.taskController.modal();

            this.indexFirst = false;
        });

        lastButton.addEventListener("click", () => {
            this.startShort = false;
            this.indexLast = true;
            console.log("en cFLbuttons: ", container.childNodes.length)
            this.shortPagination(container.childNodes.length);
            this.printPage(lastButton.textContent);
            this.taskController.modal();

            this.indexLast = false;
        });

    }
}