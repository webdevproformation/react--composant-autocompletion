const url = import.meta.env.VITE_API;

export async function addCommentaire( commentaire  , id_article ){
    const options = { 
        method : "POST" , 
        body : JSON.stringify(commentaire) , 
        headers : {
            "content-type" : "application/json"
        }
    }
    try{
        const reponse = await fetch(`${url}/article/add-commentaire/${id_article}` , options); 
        const article = await reponse.json()
        if(reponse.status !== 200){
            throw new Error(article)
        }
        return article ; 
    }catch(err){
        return { msg : "erreur" }
    }
}