export default class Pagination{

    data;
    dataContainer;
    buttonContainer;
    sizePage;
    printData;
    totalPages;
    startShort = false; // Indica si la paginación se ha abreviado (cortado)
    prev = false; // Indica si la paginación esta yendo hacias atrás
    next = false // Indica si la paginación esta yendo hacias adelante
    firstButtons = false; // Indica si el primer grupo de botones fueron creados
    lastButtons = false // Indica si el último grupo de botones fueron creados

    constructor(data, dataContainer, buttonContainer, sizePage, printData){
        this.data = data;
        this.dataContainer = dataContainer;
        this.buttonContainer = buttonContainer;
        this.sizePage = sizePage;
        this.printData = printData;
    }

    pagination(){ // Crea los botones de acuerdo a la cantidad de páginas
        this.totalPages = Math.ceil((this.data.length == 0 ? 1 : this.data.length) / this.sizePage);
        let mainPagination = document.createElement("DIV")
        mainPagination.id = "mainPagination"

        this.buttonContainer.innerHTML = ""
        this.buttonContainer.appendChild(mainPagination);

        if(this.totalPages > 5){
            this.shortPagination(0);
        } else {
            this.createButtons(mainPagination);
        }
        
        this.printPage(1);
        this.createNextPrev(mainPagination, true);
        mainPagination.childNodes[0].classList.add("btn__page--selected")
    }

    createButtons(container){
        let mainPagination = document.getElementById("mainPagination");
        
        for (let i = 0; i < this.totalPages; i++) {
            let button = document.createElement("BUTTON");
            button.textContent = i + 1;
            button.classList.add("btn", "btn__page")
            container.appendChild(button);
        }

        [...container.childNodes].forEach((button, index) => {
            button.addEventListener("click", (e) => {
                this.printPage(e.target.textContent);

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
                        this.shortPagination((+e.target.textContent-2)); //Pasa el total de paginas y el texto del boton menos 3, ya que este será un indice para el arreglo Container de shortPagination
                        mainPagination.childNodes[mainPagination.childNodes.length-2].classList.add("btn__page--selected")
                    }

                }
                
                button.classList.add("btn__page--selected")
            });
        });
    }

    createNextPrev(mainPagination, full) {
        // Limpia los botones de 'next' y 'prev' para evitar duplicados
        let moveButtons = document.querySelectorAll(".btn__page--move");
        if (moveButtons.length > 0) {
            moveButtons.forEach(button => button.remove());
        }
    
        let boardPagination = document.getElementById("pageTask");
        let nextButton = document.createElement("BUTTON");
        let prevButton = document.createElement("BUTTON");
    
        let counterIndex = full ? 0 : 1; // Índice de la página actual
        this.firstButtons && this.prev ? counterIndex = 3 : counterIndex; // Si se activan los primeros 5 botones la posición de los botones de desplazamiento será de 3 (4 botón)
        !this.startShort ? counterIndex = 0 : counterIndex;

        // Clases y texto para los botones
        nextButton.classList.add("btn", "btn__page--move");
        prevButton.classList.add("btn", "btn__page--move");
        nextButton.textContent = ">";
        prevButton.textContent = "<";
    
        // Agregar los botones al DOM
        boardPagination.prepend(prevButton);
        boardPagination.appendChild(nextButton);
    
        // Función para manejar el clic en el botón "prev"
        prevButton.addEventListener("click", () => {
            this.prev = true;
            this.next = false;
            // this.firstButtons ? counterIndex = 3 : counterIndex;
            if (counterIndex > 0) {
                counterIndex--;  // Mover hacia la página anterior
                mainPagination.children[counterIndex].click();  // Simula un clic en el botón de la página anterior
            }
        });
    
        // Función para manejar el clic en el botón "next"
        nextButton.addEventListener("click", () => {
            this.next = true;
            this.prev = false;
            if (counterIndex < mainPagination.children.length - 1) {
                counterIndex++;  // Mover hacia la página siguiente
                mainPagination.children[counterIndex].click();  // Simula un clic en el botón de la siguiente página
            }
        });
    
        // Añadir los eventos de clic a los botones de paginación
        [...mainPagination.children].forEach((button, index) => {
            button.addEventListener("click", () => {
                console.log(index)
                counterIndex = index;  // Actualiza el índice con el botón clickeado
            });
        });
    }

    printPage(page){ // Imprime los datos de la página correspondiente
        let counterTask = (+page * this.sizePage) - this.sizePage;
        let taskPage = [];

        for (let i = 0; i < +this.sizePage; i++) { // Recorrerá un máximo de 5 veces para extrar las tareas usando el contador de tareas ya impresas
            if(counterTask + i < this.data.length){
                taskPage.push(this.data[counterTask + i]);
            }
        }

        this.dataContainer.innerHTML = ""
        this.dataContainer.innerHTML = this.printData(taskPage)
        // this.modalOption(); 
    }


    shortPagination(indexButton){
        let mainPagination = document.getElementById("mainPagination");
        let container = document.createElement("DIV");
        let buttonPage = []

        let index = this.startShort ? 3 : 5 // Permite generar 5 botones cuando se encuentre en los primeros 5 botones y mientras se avanza solo 3 botones
       
        mainPagination.innerHTML = "";
        this.createButtons(container);

        // Crea el primer botón y último cuando la paginación se abrevia (corta)
        if(this.startShort){
            if(!document.getElementById("containerFirstButton") && !document.getElementById("containerLastButton")){
                this.createFirstLastButtons(container);
            }
        }

        // Hace referencia al último grupo de 5 botones (1, 2, 3, 4, 5)
        if(this.next && indexButton == container.childNodes.length-5){
            index = 5;
            this.startShort = false;
            this.lastButtons = true;
            document.getElementById("containerFirstButton").remove();
            document.getElementById("containerLastButton").remove();
        }

        // Hace referencia al primer grupo de 5 botones ej: (7, 8, 9, 10, 11)
        if(this.prev && indexButton == 2){
            index = 5
            indexButton = 0;
            this.startShort = false;
            this.firstButtons = true;
            document.getElementById("containerFirstButton").remove();
            document.getElementById("containerLastButton").remove();
        }

        this.createNextPrev(mainPagination, false);

        for (let i = 0; i < index; i++) {
            if(container.childNodes[i + (indexButton)] != null){ //Extraerá todos los botones del container de acuerdo al indice obtenido (número botón menos 3 para que el boton seleccionado se ubique a la mitad)
                buttonPage.push(container.childNodes[i + (indexButton)])
            }
        }

        buttonPage.forEach(button => {
            mainPagination.appendChild(button)
        })
    }

    createFirstLastButtons(container){
        let firstButton = document.createElement("BUTTON");
        let lastButton = document.createElement("BUTTON");
        let containerFirstButton = document.createElement("DIV");
        let containerLastButton = document.createElement("DIV");
        let dotsFirst = document.createElement("P");
        let dotsLast = document.createElement("P");
        firstButton.textContent = 1;
        lastButton.textContent = container.childNodes.length;
        containerFirstButton.id = "containerFirstButton";
        containerLastButton.id = "containerLastButton";
        dotsFirst.textContent = "...";
        dotsLast.textContent = "...";
        firstButton.classList.add("btn", "btn__page");
        lastButton.classList.add("btn", "btn__page");
        containerFirstButton.prepend(firstButton);
        containerFirstButton.appendChild(dotsFirst);
        containerLastButton.prepend(dotsLast);
        containerLastButton.appendChild(lastButton);
        this.buttonContainer.prepend(containerFirstButton);
        this.buttonContainer.appendChild(containerLastButton);

        firstButton.addEventListener("click", (e) => {
            this.startShort = false;
            this.shortPagination(0);
            this.printPage(firstButton.textContent)
            document.getElementById("containerFirstButton").remove();
            document.getElementById("containerLastButton").remove();

            
        });

        lastButton.addEventListener("click", (e) => {
            this.startShort = false;
            this.shortPagination(container.childNodes.length-2);

            e.target.classList.add("btn__page--selected")
            this.printPage(lastButton.textContent)
            try {
                document.getElementById("containerFirstButton").remove();
                document.getElementById("containerLastButton").remove();
            } catch (error) {
                
            }
        });
    }
}