import ListController from "../controller/ListController.js";
import ListRepository from "../repository/ListRepository.js";
import ListService from "../service/ListService.js";

export default class ListContainer{
    constructor(){}

    static controller(){
        return new ListController();
    }

    static service(){
        return new ListService();
    }

    static repository(){
        return new ListRepository()
    }
}