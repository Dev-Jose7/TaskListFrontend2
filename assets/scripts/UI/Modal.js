import TaskContainer from "../container/TaskContainer.js";

export default class Modal{
    taskController = TaskContainer.controller();

    constructor(crud = null){
        this.title = "";
        this.message = "";
        this.footer = "";
        this.action = "";
        
        if(crud){
            this.crud = crud;
            this.type = "";
            this.instance = "";
            this.bodyForm = "";
            this.createorUpdateButton = "";
            this.optionButtons = "";
            this.deleteButtons = "";
            this.instanceTemplate = "";
            this.modalAdd = null;
            this.modalOption = null;
            this.modalUpdate = null;
            this.modalDelete = null;
            this.modalConfirm = null;
            this.modalsDefault();
        }
    }

    setType(type){
        this.type = type;
    }

    setTitle(title){
        this.title = title;
    }

    setMessage(message){
        this.message = message;
    }

    setFooter(footer){
        this.footer = footer;
    }

    setInstance(instance){
        this.instance = instance;
    }

    setAction(callback){
        this.action = callback;
    }

    setModalAdd(callback){
        this.modalAdd = callback;
    }

    setModalOption(callback){
        this.modalOption = callback;
    }

    setModalUpdate(callback){
        this.modalUpdate = callback;
    }

    setModalDelete(callback){
        this.modalDelete = callback;
    }

    setModalConfirm(callback){
        this.modalConfirm = callback;
    }

    // Segunda función
    createModal(){ // Crea la modal en base a la platilla de los elementos especificados
        // Se crea elemento base de la modal
        let body = document.querySelector("body")
        let containerModal = document.createElement("DIV");
        document.getElementById("containerModal") ? this.deleteModal() : null
        containerModal.id = "containerModal";
        // Se crean las plantillas de los elementos que conformarán el cuerpo de las modales y modal CRUD y se crea la modal.
        this.crud ? this.createElementTemplate(this.type) : null
        containerModal.innerHTML = this.templateModal(this.type);
        body.appendChild(containerModal);
        // Se invoca función para poder cerrar (eliminar) la modal cuando se haga clic en la x
        this.modalClose();

    }

    templateModal(type){
        let elemento = `
        <div class="modal__container modal__container--form" id="modal">
            <div class="modal__content">
                <button class="btn-close">
                    <i class="fas fa-times"></i> 
                </button>
                <div class="modal__header">
                    <h3>${this.title}</h3>
                </div>
                <div class="modal__body">
                    ${type == "confirmar" || type == "opciones" || type == "eliminar" ? this.instanceTemplate : 
                        type == "crear" || type == "actualizar" ? this.bodyForm : 
                        type == null ? this.message : null}
                    
                </div>
                <div class="modal__footer ${type != "opciones" && type != "eliminar" ? "modal__footer--one" : ""}">
                    ${type == "crear" || type == "actualizar" ? this.createorUpdateButton : 
                        type == "opciones" ? this.optionButtons : 
                        type == "eliminar" ? this.deleteButtons : 
                        type == null ? this.footer : null}
                </div>
            </div>
        </div>`

        return elemento;
    }

    modalClose(){
        let btnClose = document.getElementById("containerModal").querySelector(".btn-close")
        btnClose.addEventListener("click", () => {
            this.deleteModal();
        })
    }

    clickToOpen(element, getInstance){ // Primera función
        element.addEventListener("click", async () => {
            getInstance ? this.instance = await this.taskController.getTaskByClick() : undefined
            
            this.crud ? this.actionCrud(element) : undefined

            if(!this.crud){
                this.createModal(); //Una modal se puede abrir directamente con createModal() o usando el método clickToOpen para asignarlo a un elemento el cuál la creé al hacer click
                this.action(element);
            }
        });
    }

    // Escanea los elementos principales los cuales al hacer click mostrarán una modal
    scanElement(callback){ // El callback que recibe este método es proporcionado por el script que lo necesite, por ende es modificado de acuerdo al contexto de la aplicación.
        callback();
    }

    // Establece las acciones que debe de realizar cada uno de los boton de cada tipo de modal
    actionCrud(element){
        if(element.id == "modalAddButton"){ // Es el boton que abre la modal para crear ej (+ Tarea)
            this.deleteModal();
            this.modalAdd();
        }

        if(element.classList.contains("editTask")){ // Es el boton que abre las opciones de la(s) instancias impresas ej botón (...)
            this.deleteModal();
            this.modalOption();
        }

        if(element.id == "addModal"){// Es el botón de la modal de tipo crear (boton: Crear)
            this.instance = this.taskController.addTask();
            this.deleteModal();
            this.modalConfirm();
        }

        if(element.id == "updateModalOption"){ // Es el botón de modificar de la modal de tipo opciones (botones: Modificar - Eliminar)
            this.deleteModal();
            this.modalUpdate();
        }

        if(element.id == "deleteModalOption"){ // Es el botón de eliminar de la modal de tipo opciones (botones: Modificar - Eliminar)
            this.deleteModal();
            this.modalDelete();
        }

        if(element.id == "updateModal"){ // Es el botón de la modal de tipo actualizar (boton: Actualizar)
            this.instance = this.taskController.updateTask(this.instance);
            this.deleteModal();
            this.modalConfirm();
        }

        if(element.id == "deleteModal"){ // Es el botón Si de la modal de tipo eliminar (botones: Si - No)
            this.taskController.deleteTask(this.instance);
            this.deleteModal();
            this.modalConfirm();
        }    

        if(element.id == "exitModal"){ // Es el botón No de la modal de tipo eliminar (botones: Si - No)
            this.deleteModal();
            this.modalOption();
        }
    }

    deleteModal(){
        try {
            document.getElementById("containerModal").remove();
        } catch (error) {
            
        }
    }

    createElementTemplate(type){
        this.bodyForm = 
        `<div id="modalForm">
             <input type="text" class="form-input" id="inputNameModal" placeholder="Nombre" value="${type == "Actualizar" ? this.instance.name : ""}" required>
             <input type="date" class="form-input" id="inputDateModal" placeholder="Fecha" value="${type == "Actualizar" ? this.instance.dateFormat : ""}" required>
             <textarea class="form-input" id="inputDescriptionModal" placeholder="Mensaje (Opcional)" rows="4"></textarea>
         </div>`
        
        this.instanceTemplate = 
        `<div class="board__task-text board__task-text--modal">
            <h4>${this.instance.name}</h4>
            <p>${this.instance.dateFormat}</p>
            <p>${this.instance.description}</p>
        </div>`

        this.createorUpdateButton = 
        `<button class="btn btn__option" type="submit" form="modalForm" id="${type == "crear" ? "addModal" : "updateModal"}">
            <i class="fas fa-plus"></i>
            ${type == "crear" ? "Crear" : "Actualizar"}
        </button>`

        this.optionButtons = 
        `<button class="btn btn__option" id="updateModalOption">
            <i class="fas fa-pen-alt"></i>
            Modificar
        </button>
        <button class="btn btn__option" id="deleteModalOption">
            <i class="fas fa-trash-alt"></i>
            Eliminar
        </button>`

        this.deleteButtons = 
        `<button class="btn btn__option" id="deleteModal">
            <i class="fas fa-check"></i>
            Si
        </button>
        <button class="btn btn__option" id="exitModal">
            <i class="fas fa-times"></i>
            No
        </button>`
    }

    // Crea las modales CRUD predeterminadas
    modalsDefault(){
        this.modalAdd = () => {
            this.setType("crear"); // Define un tipo a la modal
            this.setTitle("Crear"); // Define un titulo a la modal se modifica de acuerdo al contexto de la aplicación
            this.createModal(); // Se crea la modal, las modales crud serán creadas con el metodo actionCrud y este a su vez será invocado por el método clickToOpen
            this.clickToOpen(document.getElementById("addModal")); // Se establece click al boton de esta modal, es decir a la que va a crear
        }

        this.modalOption = () => {
            this.setType("opciones");
            this.setTitle("Opciones");
            this.createModal();
            this.clickToOpen(document.getElementById("updateModalOption"))
            this.clickToOpen(document.getElementById("deleteModalOption"))
        }

        this.modalConfirm = () => {
            this.setType("confirmar");
            this.setTitle("Confirmación");
            this.createModal();
        }

        this.modalUpdate = () => {
            this.setType("actualizar");
            this.setTitle("Actualizar");
            this.createModal();
            let inputName = document.getElementById("inputNameModal");
            let inputDate = document.getElementById("inputDateModal");
            let inputDescription = document.getElementById("inputDescriptionModal");
            inputName.value = this.instance.name;
            inputDate.value = this.instance.dateFormat;
            inputDescription.value = this.instance.description;
            this.clickToOpen(document.getElementById("updateModal"))
        }

        this.modalDelete = () => {
            this.setType("eliminar");
            this.setTitle("Eliminar");
            this.createModal();
            this.clickToOpen(document.getElementById("deleteModal"))
            this.clickToOpen(document.getElementById("exitModal"))
        }
    }

    static modalTest(){
        let modal = new Modal();
        let message = `
        <div class="card">
            <div class="card-content">
            <h3 class="card-title">Cámara Digital XYZ</h3>
            <p class="card-description">Captura tus momentos con esta cámara digital de alta resolución. Ideal para fotógrafos principiantes y avanzados.</p>
            <p class="card-price">$499.99</p>
            </div>
        </div>`
        let footer = `<button class="add-to-cart-btn btn btn__list">Añadir al carrito</button>`

        modal.setTitle("Detalles del producto")
        modal.setMessage(message);
        modal.setFooter(footer)
        modal.createModal();
        modal.clickToOpen(document.querySelector(".add-to-cart-btn"))
        modal.setAction((element) => {
            let modalConfirm = new Modal()
            modalConfirm.setTitle("¡Hecho!")
            modalConfirm.setMessage("El pedido ha sido añadido al carrito")
            modalConfirm.createModal();
        })
    }
}