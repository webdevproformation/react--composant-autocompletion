import InputText from "../commun/InputText"
import Textarea from "../commun/Textarea"
import {useState ,  useContext } from "react"
import { getAll } from "../../services/categorie.js"
import { newArticle } from "../../services/article.js"
import { validArticle } from "../../utils/validation.js"
import { useNavigate } from "react-router-dom"
import {UserContext} from "../../context/userContext"
import { toast } from 'react-toastify';

function AdminAddArticle(){
    const {profil} = useContext(UserContext); 
    const navigate = useNavigate(); 
    const [titre, setTitre] = useState("")
    const [contenu, setContenu] = useState("")
    const [categorie, setCategorie] = useState("")
    const [file, setFile] = useState(null);
    const categories = getAll()

    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };

    async function onSubmit(event){
        event.preventDefault();
        const nouvelArticle = {titre, contenu , categorie}
        // ajouter de verification 
        const {error} = validArticle.validate(nouvelArticle, {abortEarly : false})
        if(error){
            // afficher des erreurs dans la zone d'erreur sous formulaire 
            for (let item of error.details) 
                toast.error(item.message) ;
            return ; 
        }
        nouvelArticle.auteur = profil._id; 
        nouvelArticle.file = file; 

        const reponse = await newArticle(nouvelArticle)
        
        if(reponse._id){
            setContenu("")
            setTitre(""); 
            setFile(""); 
            setCategorie("");
            toast.success("l'article est bien enregistré en base de données !!!")
            navigate("/admin")
        }else {
            toast.error(reponse.msg)
        }
    }
   
    return (
        <div className="admin">
            <h1>Ajouter un nouvel article</h1>
            <form onSubmit={onSubmit}>
            <InputText 
                placeholder="le titre de l'article"
                id="titre"
                label="saisir le titre de l'article"
                action={function(event){
                    setTitre(event.target.value)
                }}
                value={titre}
            />
            <div>
                <label htmlFor="categorie">catégorie associée</label>
                <select name="categorie" id="categorie" onChange={function(event){
                    setCategorie(event.target.value)
                }}
                required value={categorie}>
                    <option value="">sélectionner une catégorie</option>
                    {categories.map(function(categorie , index){
                        return <option key={index} value={categorie.label}>{ categorie.label }</option>
                    })}
                </select>
            </div>
            <div>
                <label htmlFor="image">image à la une</label>
                <input type="file"  id="image" name="image" onChange={handleFileChange}  />
            </div>
            <Textarea 
                id="contenu"
                label="le contenu de l'article"
                placeholder="le contenu de l'article"
                action={ function(event){
                    setContenu(event.target.value)
                }}
                value={contenu}
            />
            <div>
                <input type="submit" value="ajouter nouvel article"/>
            </div>
            </form>
        </div>

    )
}
export default AdminAddArticle ;