import {Schema, model , ObjectId} from "mongoose"
import Joi from "joi";

const schemaArticle = new Schema(
    {
        titre : {
            type : String, 
            required : true ,
            minlength : 2 ,
            maxlength : 255},
        contenu : {
            type : String, 
            required : true ,
            minlength : 2 ,
            maxlength : 10_000},
        dt_publication : {type : Date , default : Date.now},
        commentaires : [
            {
                nom : String ,
                message : String ,
                dt_publication : {type : Date , default : Date.now}
            }
        ],
        categorie : {
            type : String , 
            required : true , 
            enum : ["activité" ,"gastronomie","culture","balade"  ]},
        auteur : ObjectId ,
        img : String 
    }
);

export const Article = model("blog_articles", schemaArticle)

export const validArticle = Joi.object({
    titre : Joi.string().min(2).max(255).required() ,
    contenu : Joi.string().min(2).max(10_000).required() ,
    commentaires : Joi.array().optional(), 
    categorie : Joi.string().valid("activité" ,"gastronomie","culture","balade" ).required() ,
    auteur : Joi.string().optional(),
    img : Joi.string().min(2).max(255).optional()
})


export const validCommentaire = Joi.object({
    nom : Joi.string().min(2).max(255).required() ,
    message : Joi.string().min(2).max(10_000).required()
});

