import {Router} from "express"
import { Article , validCommentaire } from "../model/article.js";
import { isValidObjectId } from "mongoose"
import {verifyToken} from "../middleware/verif.js"
import {isValidImg, downloadImg , isValidArticle } from "../middleware/image-upload.js"
import fsp from "node:fs/promises"

const router = Router(); 

// récupérer l'ensemble des articles stockés 
router.get("/articles" , async function(req, rep){
    try{
        const articles = await Article.find().sort({ dt_publication: -1 });
        rep.json(articles); 
    }catch(err){
        console.log(err);
        rep.status(500).json({msg: "erreur lors de la requête de récupération"})
    }
})

router.get("/articles/:id", async function(req, rep){
    const id = req.params.id
    const verif = isValidObjectId(id)
    if(!verif){
        rep.status(400).json({msg : "id invalid"});
        return ; 
    }
    const article = await Article.findOne({_id : id})
    if(!article){
        rep.status(404).json({msg : "article introuvable"})
        return ; 
    }
    rep.json(article); 
})

router.post("/add-article", verifyToken , isValidImg , isValidArticle ,  downloadImg , async function(req, rep){
    let { article } = req; 
    article = new Article(article)
    const reponse =  await article.save(); 
    rep.json(reponse); 
})

router.get("/delete-article/:id", verifyToken ,  async function(req, rep){
    const id = req.params.id ; 
    const verif = isValidObjectId(id)
    if(!verif){
        rep.status(400).json({msg : "id invalid"});
        return ; 
    }
    const article = await Article.findOne({_id : id})
    if(!article){ 
        rep.status(404).json({msg : "article introuvable"})
        return ; 
    }
    // supprimer le fichier image
    if(article.img){
        await fsp.unlink(article.img)
    }
    await Article.deleteOne({_id : id})
    const allArticles = await Article.find().sort({ dt_publication: -1 });
    rep.json(allArticles) ;  
})

router.post("/update-article/:id", verifyToken , isValidImg , isValidArticle ,  downloadImg  , async function(req, rep){
    const id = req.params.id ;
    const body = req.article ; 
    const reponse = await Article.updateOne({_id : id},{$set : body}, {$new : true });
    rep.json(reponse);
});

router.post("/article/add-commentaire/:id", async function(req, rep){
    const id = req.params.id ;
    const body = req.body ; 

    const {error} = validCommentaire.validate(body , {abortEarly : false});

    if(error){
        console.log(error);
        return rep.status(400).json({msg : "formulaire mal rempli"})
    }

    const reponse =  await Article.updateOne({_id : id }, { 
        $push : {commentaires : body}
        // $addToSet pour ajouter une valeur sans double 
    })
    rep.json(reponse);
})  

export default router 
