import data from "../assets/data.json";

/**
 * permet de retourner tous les articles de la base de données 
 * @returns array 
 */
export function getAll(){
    return data.categories ; 
}