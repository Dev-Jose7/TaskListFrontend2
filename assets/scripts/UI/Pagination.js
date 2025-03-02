export default class Pagination{

    data;
    dataContainer;
    buttonContainer;
    sizePage;
    printData;
    counterIndex;
    startShort = false;

    constructor(data, dataContainer, buttonContainer, sizePage, printData){
        this.data = data;
        this.dataContainer = dataContainer;
        this.buttonContainer = buttonContainer;
        this.sizePage = sizePage;
        this.printData = printData;
        this.counterIndex = 0;
    }

    pagination(){ // Crea los botones de acuerdo a la cantidad de páginas
        let totalPages = Math.ceil((this.data.length == 0 ? 1 : this.data.length) / this.sizePage);
        let mainPagination = document.createElement("DIV")
        mainPagination.id = "mainPagination"

        this.buttonContainer.innerHTML = ""
        this.buttonContainer.appendChild(mainPagination);

        if(totalPages > 5){
            this.shortPagination(totalPages, 0);
        } else {
            this.createButtons(totalPages, mainPagination);
        }
        
        this.printPage(1);
        this.createNextPrev(mainPagination, true);
        mainPagination.childNodes[0].classList.add("btn__page--selected")
    }


    createButtons(totalPages, container){
        let mainPagination = document.getElementById("mainPagination");
        
        for (let i = 0; i < totalPages; i++) {
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

                if(totalPages > 5){
                    this.startShort = true;
                    // Hace referencia al último boton
                    // Si el elemento clickeado es igual que al ultimo nodo hijo de mainPagination y
                    // El texto del elemento clickeado es diferente al total de paginas
                    if(e.target == mainPagination.childNodes[mainPagination.childNodes.length-1] && 
                        e.target.textContent != totalPages){
                        this.shortPagination(totalPages, e.target.textContent-3) //Pasa el total de paginas y el texto del boton menos 3, ya que este será un indice para el arreglo Container de shortPagination
                        mainPagination.childNodes[mainPagination.childNodes.length-3].classList.add("btn__page--selected") // Selecciona al tercer boton
                    }

                    //Hace referencia al primer botón
                    //Si el elemento clikeado es igual que al primer hijo nodo de mainPagination y
                    //El texto de este botón es diferente a uno
                    if(e.target == mainPagination.childNodes[0] && e.target.textContent != 1){
                        this.shortPagination(totalPages, (+e.target.textContent-3)); //Pasa el total de paginas y el texto del boton menos 3, ya que este será un indice para el arreglo Container de shortPagination
                        mainPagination.childNodes[mainPagination.childNodes.length-3].classList.add("btn__page--selected")
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
    
        let counterIndex = full ? 0 : 2; // Índice de la página actual
    
        // Clases y texto para los botones
        nextButton.classList.add("btn", "btn__page", "btn__page--move");
        prevButton.classList.add("btn", "btn__page", "btn__page--move");
        nextButton.textContent = ">";
        prevButton.textContent = "<";
    
        // Agregar los botones al DOM
        boardPagination.prepend(prevButton);
        boardPagination.appendChild(nextButton);
    
        // Función para manejar el clic en el botón "prev"
        prevButton.addEventListener("click", () => {
            if (counterIndex > 0) {
                counterIndex--;  // Mover hacia la página anterior
                mainPagination.children[counterIndex].click();  // Simula un clic en el botón de la página anterior
            }
        });
    
        // Función para manejar el clic en el botón "next"
        nextButton.addEventListener("click", () => {
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

    printPage(page){ // Imprime las tareas de la página correspondiente
        console.log(page)
        let counterTask = (+page * this.sizePage) - this.sizePage;
        let taskPage = [];
        console.log(this.data)
        for (let i = 0; i < +this.sizePage; i++) { // Recorrerá un máximo de 5 veces para extrar las tareas usando el contador de tareas ya impresas
            if(counterTask + i < this.data.length){
                taskPage.push(this.data[counterTask + i]);
            }
        }

        console.log(taskPage)

        this.dataContainer.innerHTML = ""
        this.dataContainer.innerHTML = this.printData(taskPage)
        // this.modalOption(); 
    }


    shortPagination(totalPages, indexButton){
        let mainPagination = document.getElementById("mainPagination")
        let lastButton = mainPagination.childNodes[mainPagination.childNodes.length - 1];
        let container = document.createElement("DIV");
        let buttonPage = []
        
        // container.childNodes[numberPage-1].classList.add("btn__page--selected")
        try {
            console.log(lastButton.classList.contains("btn__page--selected"))
        } catch (error) {
            
        }
        mainPagination.innerHTML = ""
        this.createButtons(totalPages, container);
        this.createNextPrev(mainPagination, false);
        
        for (let i = 0; i < 5; i++) {
            if(container.childNodes[i + (indexButton)] != null){ //Extraerá todos los botones del container de acuerdo al indice obtenido (número botón menos 3 para que el boton seleccionado se ubique a la mitad)
                buttonPage.push(container.childNodes[i + (indexButton)])
            }
        }

        buttonPage.forEach(button => {
            mainPagination.appendChild(button)
        })
    }
}