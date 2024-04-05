import Joi from "joi"
// npm i joi 

export const validCommentaire = Joi.object({
    nom : Joi.string().min(2).max(255).required() ,
    message : Joi.string().min(2).max(10_000).required()
});

export const validArticle = Joi.object({
    titre : Joi.string().min(2).max(255).required() ,
    contenu : Joi.string().min(2).max(10_000).required() ,
    commentaires : Joi.array().optional(), 
    categorie : Joi.string().valid("activité" ,"gastronomie","culture","balade" ).required() 
})

// w3school input 
// https://www.w3schools.com/tags/att_input_pattern.asp

export const validUser = Joi.object({
    email : Joi.string().email({ tlds: { allow: false } }).required(),
    password : Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required().messages({ "string.pattern.base" : "le password doit contenir au moins 8 caractères avec des majuscules, des minuscules et des chiffres"})
})

