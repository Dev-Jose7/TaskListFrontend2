import TaskController from "../controller/TaskController.js";

export default class Modal{
    taskController = new TaskController();

    constructor(type){
        this.type = type;
        this.title = "";
        this.message = "";
        this.instance = "";
        this.bodyForm = "";
        this.createorUpdateButton = "";
        this.optionButtons = "";
        this.deleteButtons = "";
        this.instanceTemplate = "";
        this.action = "";
        this.functionAction = null;
    }

    setTitle(title){
        this.title = title;
    }

    setMessage(message){
        this.message = message;
    }

    setInstance(instance){
        this.instance = instance;
    }

    setAction(action){
        this.action = action;
    }

    createModal(){ // Crea la modal en base a la platilla de los elementos especificados
        // Se crea elemento base de la modal
        let body = document.querySelector("body")
        let containerModal = document.createElement("DIV");
        containerModal.id = "containerModal";
        // Se crean las plantillas de los elementos que conformarán el cuerpo de la modal y se crea la modal.
        this.createElementTemplate(this.type);
        containerModal.innerHTML = this.templateModal(this.type);
        body.appendChild(containerModal);
        // Se invoca función para poder cerrar (eliminar) la modal cuando se haga clic en la x
        this.modalClose();
        
        if(this.type != null){
            this.takeAction();
        }
    }

    templateModal(type){
        let elemento = `
        <div class="modal__container modal__container--form" id="modal">
            <div class="modal__content">
                <div class="modal__header">
                    <h3>${this.title}</h3>
                    <button class="btn-close">
                        <i class="fas fa-times"></i> 
                    </button>
                </div>
                <div class="modal__body">
                    ${type == "confirmar" || type == "opciones" || type == "eliminar" ? this.instanceTemplate : 
                        type == "crear" || type == "actualizar" ? this.bodyForm : 
                        type == null ? this.message : null}
                    
                </div>
                <div class="modal__footer ${type != "opciones" && type != "eliminar" ? "modal__footer--one" : ""}">
                    ${type == "crear" || type == "actualizar" ? this.createorUpdateButton : 
                        type == "opciones" ? this.optionButtons : 
                        type == "eliminar" ? this.deleteButtons : ""}
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

    clickToOpen(element, getInstance){
        element.addEventListener("click", async () => {
            if(getInstance){
                this.instance = await this.taskController.getTaskByClick();
                console.log(this.instance)
            }

            // Implementan la función functionAction de acuerdo al elemento clickado, es decir, cuando hayan dos opciones 
            if(element.id == "updateModalOption" || element.id == "deleteModalOption"){
                this.functionAction = () => {
                    this.deleteModal();
                    element.id == "updateModalOption" ? this.taskController.modalUpdate(this.instance) : 
                    element.id == "deleteModalOption" ? this.taskController.modalDelete(this.instance) : undefined
                }
            }

            if(element.id == "deleteModal" || element.id == "exitModal"){
                this.functionAction = () => {
                    this.action(this.instance);
                    this.deleteModal();
                    element.id == "deleteModal" ? this.taskController.modalConfirm(this.instance, "¡Tarea eliminada con exito!") : 
                    element.id == "exitModal" ? this.deleteModal() : undefined;
                }
            }

            this.functionAction != null ? this.functionAction() : this.createModal();
        });
    }

    takeAction(){
        if(this.type == "crear" || this.type == "actualizar"){
            this.clickToOpen(document.getElementById(this.type == "crear" ? "addModal" : this.type == "actualizar" ? "updateModal" : undefined))
            this.functionAction = () => {
                if(this.type == "crear" || this.type == "actualizar"){
                    let instance = this.action(this.type == "actualizar" ? this.instance : undefined);
                    this.deleteModal();
                    this.taskController.modalConfirm(instance, this.type == "crear" ? "¡Tarea creada con exito!" : "¡Tarea actualizada con exito!");
                
                }
            }
        }

        if(this.type == "opciones" || this.type == "eliminar"){
            this.clickToOpen(document.getElementById(this.type == "opciones" ? "updateModalOption" : this.type == "eliminar" ? "deleteModal" : undefined));
            this.clickToOpen(document.getElementById(this.type == "opciones" ? "deleteModalOption" : this.type == "eliminar" ? "exitModal" : undefined));
        
            // functionAction es implementada en clickToOpen debido a que estos dos tipos de modal manejarán dos funciones
        }
        
    }

    deleteModal(){
        try {
            document.getElementById("containerModal").remove();
            this.functionAction = null; 
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
}