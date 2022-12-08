import * as ACTIONS from "./action_type";

function uniqueKey(){
    return Math.random() + ""
}

export function add(newValue){
    return { type : ACTIONS.ADD , payload : { value : newValue , ukey : uniqueKey()  }}
}

export function remove(ukey){
    return {type : ACTIONS.REMOVE , payload : ukey}
}

export function modify(ukey , newValue){
    return { type : ACTIONS.MODIFY , payload : {value : newValue , ukey : ukey }}
}

export function revert(){
    return { type : ACTIONS.REVERT }
}

export function find(valueToFind){
    return { type : ACTIONS.FIND , payload : valueToFind }
}