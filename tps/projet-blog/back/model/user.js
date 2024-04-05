import Joi  from "joi"
import {Schema, model} from "mongoose"
import sign from "jsonwebtoken/sign.js"

const schemaUser = new Schema({
    email : {
        type : String , 
        required : true ,
        minlength : 2 ,
        maxlength : 255
    },
    password  : {
        type : String , 
        required : true ,
        minlength : 2 ,
        maxlength : 255
    },
    dt_creation :  {type : Date , default : Date.now},
    dt_last_connexion : Date , 
    role  : {type : String , enum : ["redacteur", "admin"] , default : "redacteur"}
})

schemaUser.methods.generateJWT = function(){
    const payload = { // charge utile itéressant du jwt 
        _id : this._id,
        email : this.email ,
        role : this.role ,
        dt_creation: this.dt_creation
        // ne pas stocker d'informations sensibles dans le jwt
    }; 
    try{
        const jwttoken = sign(payload , process.env.SECRET_JWT);
        return jwttoken ; 
    }catch(err){
        throw new Error(err); 
    }
   
}

export const User = model( "blog_users" , schemaUser);

export const validUser = Joi.object({
    email : Joi.string().email({ tlds: { allow: false } }).required(),
    password : Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required().messages({ "string.pattern.base" : "le password doit contenir au moins 8 caractères avec des majuscules, des minuscules et des chiffres"})
})