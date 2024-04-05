// ce fichier permet de peupler la base de données avec un jeu de 6 Documents 

import {Router} from "express"
import { Article } from "../model/article.js";

const router = Router();

router.get("/addAll" , async function(req, rep){
    const articles = [
       {
           "titre" : "article 1",
           "contenu" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer faucibus nisl lacus, eget elementum libero facilisis ut. Suspendisse eget tincidunt libero, vestibulum interdum risus. Nunc id odio eu metus finibus lobortis. Vestibulum volutpat sit amet ante et tincidunt. Donec arcu risus, bibendum at tincidunt eget, bibendum nec justo. Vestibulum euismod suscipit nisl non accumsan. Etiam blandit suscipit dui, eu vulputate dolor ultricies at. Aenean sit amet urna at tellus lacinia ornare. ",
           "commentaires" : [],
           "categorie" : "activité"
       },
       {
           "titre" : "article 2",
           "contenu" : "Aliquam leo enim, tempus non aliquet id, rutrum at purus. Aliquam commodo lacinia dui ut iaculis. Nulla efficitur leo vitae sem maximus, eget cursus leo dictum. Nulla dictum finibus facilisis. Duis vel posuere justo. Maecenas auctor sem et quam vulputate, vitae hendrerit metus porttitor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum ipsum tortor, elementum sed porttitor a, placerat posuere eros. Duis malesuada mollis urna, sed consequat est lacinia at. Integer rhoncus nec nisi id imperdiet. Cras scelerisque leo et dolor pharetra, eget mattis elit blandit. Sed vel fringilla est. Sed sodales, ex non elementum porta, velit nisl condimentum augue, eget viverra massa magna ut ipsum. Etiam malesuada hendrerit finibus. Donec vestibulum mauris sed purus dapibus condimentum. Phasellus quis lacus eget nisl consectetur pretium eu at magna. ",
           "commentaires" : [
               { "nom" : "Céline" , "message" : "bonjour" }
           ],
           "categorie" : "gastronomie"
       },
       {
           "titre" : "article 3",
           "contenu" : "Maecenas suscipit ligula et orci dictum, in tempor turpis scelerisque. Sed ac euismod mauris, vel consequat lorem. Cras tellus erat, placerat suscipit eleifend aliquet, sollicitudin et augue. Quisque tincidunt augue a ultrices commodo. Proin convallis enim quis libero aliquet finibus. Praesent nisi est, condimentum vitae luctus at, aliquam nec sem. Aenean molestie tincidunt gravida.",
           "commentaires" : [
               { "nom" : "Alain" , "message" : "bonjour" },
               { "nom" : "Benoit" , "message" : "hello" },
               { "nom" : "Zorro" , "message" : "Hola" }
           ],
           "categorie" : "culture"
       },
       {
           "titre" : "article 4",
           "contenu" : "Quisque quam urna, ultrices sed nulla vitae, varius porta sapien. Sed posuere, velit eget suscipit posuere, sem nisl bibendum augue, non vulputate mauris lacus eget ex. Vestibulum tortor nisl, porta non malesuada sit amet, vestibulum non magna. Quisque id dictum nisi. Vivamus et erat venenatis, tristique ipsum eu, tincidunt ipsum. Maecenas ut libero purus. Aliquam ut tellus nec nulla pellentesque scelerisque. Nam consequat molestie felis, dignissim interdum diam. ",
           "commentaires" : [
               { "nom" : "Laurent" , "message" : "bonjour" },
               { "nom" : "Julie" , "message" : "hello" , }
           ],
           "categorie" : "culture"
       },
       {
          
           "titre" : "article 5",
           "contenu" : "Nam sodales in ligula id maximus. Pellentesque tempor ex vel massa commodo, et fermentum magna malesuada. Vivamus ornare diam a sollicitudin dapibus. Maecenas nec nulla sit amet erat tincidunt posuere. Aliquam eu feugiat purus. Integer molestie, tellus vitae consequat pretium, arcu leo maximus quam, venenatis porttitor lorem eros at ante. Sed viverra tellus odio, consectetur posuere orci efficitur eu. Duis sagittis sapien eget lorem tristique tempor. Curabitur in turpis sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi arcu enim, malesuada porttitor lorem non, bibendum finibus ex. Proin nulla ligula, pharetra sodales lacus a, finibus iaculis leo. Curabitur tincidunt, ipsum at rutrum egestas, massa dolor pellentesque ex, eget tincidunt tortor felis quis mi. Duis congue consectetur eleifend. Donec scelerisque, elit quis ultricies interdum, lorem tellus aliquam orci, ut interdum eros lacus ut mauris. Nunc efficitur placerat efficitur.",
           "commentaires" : [],
           "categorie" : "activité"
       },
       {
          
           "titre" : "article 6",
           "contenu" : "Nam sodales in ligula id maximus. Pellentesque tempor ex vel massa commodo, et fermentum magna malesuada. Vivamus ornare diam a sollicitudin dapibus. Maecenas nec nulla sit amet erat tincidunt posuere. Aliquam eu feugiat purus. Integer molestie, tellus vitae consequat pretium, arcu leo maximus quam, venenatis porttitor lorem eros at ante. Sed viverra tellus odio, consectetur posuere orci efficitur eu. Duis sagittis sapien eget lorem tristique tempor. Curabitur in turpis sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi arcu enim, malesuada porttitor lorem non, bibendum finibus ex. Proin nulla ligula, pharetra sodales lacus a, finibus iaculis leo. Curabitur tincidunt, ipsum at rutrum egestas, massa dolor pellentesque ex, eget tincidunt tortor felis quis mi. Duis congue consectetur eleifend. Donec scelerisque, elit quis ultricies interdum, lorem tellus aliquam orci, ut interdum eros lacus ut mauris. Nunc efficitur placerat efficitur.",
           "commentaires" : [],
           "categorie" : "gastronomie"
       }
   ];
   
   const resultat = await Article.insertMany(articles)
       rep.json(resultat); 
   })

   export default router 