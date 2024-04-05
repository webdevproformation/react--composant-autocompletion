import express from "express"
import "dotenv/config"
import { connect } from "mongoose"
import routerArticle from "./router/article.js"
import routerUser from "./router/user.js"
import routerImage from "./router/images.js"
import cors from "cors"
import compression from "compression"
import helmet from "helmet"

const app = express();
const PORT = 1238 ;

connect(process.env.DB)
    .then(function(){
        console.log("connexion à la base réussie")
    })
    .catch(function(err){
        console.log( new Error(err) ); 
    })

app.use(cors()); 
app.use(compression()); 
//app.use(helmet());

// spécial formulaire 
app.use(express.json());
app.use(express.urlencoded({ extended : false }))

app.use("/", routerUser); 
app.use("/", routerArticle); 
app.use("/", routerImage); 

app.listen(PORT , function(){
    console.log("le serveur express écoute sur le PORT : " + PORT)
});
