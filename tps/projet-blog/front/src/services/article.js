// import data from "../assets/data.json";

const url = import.meta.env.VITE_API; 

/**
 * permet de retourner tous les articles de la base de données 
 * @returns array 
 */
/* export function getAll(){
    return data.articles ; 
} */

export async function getAll(){
    const reponse = await fetch(`${url}/articles`);
    const articles = await reponse.json()
    return articles 
}

/**
 * permet de retourner tous les articles de la base de données 
 * @returns array 
 */
/* export function getFirstFiveOrderByDate(){
    return data.articles.sort(function(a, b){
        return new Date(b.dt_publication) - new Date(a.dt_publication) ; 
    }).slice(0, 5) ; 
} */
export async function getFirstFiveOrderByDate(){
    const reponse = await fetch(`${url}/articles`);
    const articles = await reponse.json()
    return articles 
}




/**
 * permet de récupérer un article via son id 
 * @param string id 
 * @returns article | undefined  
 */
/* export function getOneById( id ){
 return data.articles.find(function(article){
    return article.id === parseInt(id)
 })
} */

export async function getOneById( id ){
    try{
        const reponse = await fetch(`${url}/articles/${id}`); 
        const article = await reponse.json()
        if(reponse.status !== 200){
            throw new Error(article)
        }
        return article ; 
    }catch(err){
        return { msg : "erreur" }
    }
}

export async function newArticle(formulaire){
    const data = new FormData();
    const {titre, contenu , categorie , auteur , file} = formulaire
    data.append("titre", titre);
    data.append("contenu", contenu);
    data.append("categorie", categorie);
    data.append("auteur", auteur);
    data.append("file", file);

    const options = { 
        method : "POST" , 
        body : data , 
        headers: { 
            'Authorization': localStorage.getItem('token')
        }
    }
    const reponse = await fetch( `${url}/add-article` , options);
    const article = await reponse.json();
    return article ; 
}

/**
 * fonction qui envoie une requête ajax vers NodeJS entrainant la suppression d'une article 
 * @param {string} id  identifiant unique de MongoDB 
 * @returns Promise<any>
 */
export async function deleteArticle(id){
    const reponse = await fetch(`${url}/delete-article/${id}`,
        {
            headers: { 
                'Authorization': localStorage.getItem('token')
            }
        }
    )
    const articles = await reponse.json();
    return articles ; 
}

export async function updateArticle(formulaire , id){
    const data = new FormData();
    const {titre, contenu , categorie , auteur , file} = formulaire
    data.append("titre", titre);
    data.append("contenu", contenu);
    data.append("categorie", categorie);
    data.append("auteur", auteur);
    data.append("file", file);

    const options = { 
        method : "POST" , 
        body : data , 
        headers: { 
            'Authorization': localStorage.getItem('token')
        }
    }

    const reponse = await fetch(`${url}/update-article/${id}` , options)
    const articles = await reponse.json();
    return articles ; 
}