import express from "express";
import cors from "cors"
import formidable from "formidable";
import fsp from "node:fs/promises"
import path from "node:path";
import {connect, Schema, model} from "mongoose"
import "dotenv/config"
import Joi from "joi"

const app = express();
const PORT = 1234 ;

connect(process.env.DB)
    .then(function(){
        console.log("connexion à la base réussie")
    })
    .catch(function(err){
        throw new Error(err)
    })

const schemaArticle = new Schema({
    description : String,
    img : String
});
const Article = model("upload_articles", schemaArticle);

app.use(cors())
app.use(express.json());

/**
 * fonction middleware qui verifier que fichier est une image et qu'il fait moins de 1 Mo
 * @param {*} req 
 * @param {*} rep 
 * @param {*} next 
 */
function isValidImg(req, rep, next){
    // attention mettre des vérifications notamment sur le type de fichiers / poids des fichiers avant l'import 
    const form = formidable();
    // récupération des données du formulaire dans req.body 
    // on utilise les name des input comme clefs de req.body
    form.parse(req, async (err, fields, files) =>  {

        //console.log(fields.description[0] , files.file[0].filepath);
        //rep.json("ok")
        //console.log(path.dirname(''))
        const file = files.file[0];

        const typeMines = [
            "image/png",
            "image/jpeg" ,
            "image/gif" ,
            "image/webp"
        ];

        if(! typeMines.includes(file.mimetype)  ){
            return rep.status(400).json({msg : "uniquement des fichiers images"});
        }

        if(file.size > 1_000_000  ){ // max 1Mo
            return rep.status(400).json({msg : "fichier trop lourd"});
        }

        const oldPath = file.filepath;
        const newPath = path.join( path.dirname('') , 'upload') + '/' + file.originalFilename
        req.oldPath = oldPath,
        req.newPath = newPath;
        req.fields = fields;
        next();
    })
}
/**
 * fonction middleware qui prend un fichier et le met dans le dossier upload
 * @param {*} req 
 * @param {*} rep 
 * @param {*} next 
 */
async function downloadImg(req, rep, next){
    const {oldPath , newPath } = req;
    let rawData = await fsp.readFile(oldPath)
    try {
        await fsp.writeFile(newPath, rawData );
        next();
    }catch(err){
        console.log(err)
        rep.status(500).json({msg : "erreur est survenue"})
    }
}
/**
 * fonction middleware pour express permet de valider que l'article est valide via joi
 * @param {*} req 
 * @param {*} rep 
 * @param {*} next 
 * @returns 
 */
function isValidArticle(req, rep, next){
    const { fields , newPath} = req

    const validArticle = Joi.object({
        description : Joi.string().min(2).max(255).required(),
        img : Joi.string().min(2).max(255).required()
    })

    const article = {
        description : fields.description[0] ,
        img : newPath
    }

    const {error} = validArticle.validate(article , {abortEarly : false})

    if(error){
        console.log(error);
        return rep.status(400).json({msg : "formulaire mal rempli"})
    }
    req.article = article ; 
    next();
}

app.post("/article", isValidImg, isValidArticle , downloadImg , async function(req, rep){
    const { article } = req; 
    let newArticle = Article(article)
    newArticle =  await newArticle.save()
    rep.json({msg : "formulaire traité correctement"})
})

app.get("/all-articles", async function(req, rep){
    try{
        const reponse = await Article.find();
        rep.json(reponse);
    }catch(err){
        console.log(err)
        rep.status(500).json({msg : "erreur est survenue"})
    }
})

app.get("/img/upload/:nom", function(req, rep){
    const nom = req.params.nom

    var options = { 
        root: path.join(path.dirname(''), 'upload'),
        //root: path.dirname(''),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
    const chemin = nom 
    rep.sendFile(chemin , options);
})

app.listen(PORT, function(){
    console.log(PORT)
})