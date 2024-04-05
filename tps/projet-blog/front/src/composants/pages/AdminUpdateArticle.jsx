import InputText from "../commun/InputText"
import Textarea from "../commun/Textarea"
import {useState , useEffect,  useContext } from "react"
import { getAll } from "../../services/categorie.js"
import { useParams , useNavigate } from "react-router-dom"
import {getOneById , updateArticle} from "../../services/article.js"
import { dtFr } from "../../utils/functions.js"
import { validArticle } from "../../utils/validation.js"
import {UserContext} from "../../context/userContext"
import _ from "lodash"
import { toast } from 'react-toastify';

function AdminAddArticle(){
    const {profil} = useContext(UserContext); 
    const [titre, setTitre] = useState("")
    const [contenu, setContenu] = useState("")
    const [dtPublication, setDtPublication] = useState("")
    const [categorie, setCategorie] = useState("")
    const [file, setFile] = useState(null);
    const categories = getAll()
    const params = useParams();
    const navigate = useNavigate();

    const id = params.id ;

    const handleFileChange = (e) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
    };

    useEffect( function(){
        async function init(){
            const article = await getOneById(id);
            if(!article){
                navigate("/404");
                return ;
            }
            setTitre(article.titre)
            setCategorie(article.categorie)
            setContenu(article.contenu)
            setDtPublication(article.dt_publication)
        }
        init(); 
    }, [])

    async function onSubmit(event){
        event.preventDefault();
        const articleModifie = {titre , contenu , categorie}
        const {error} = validArticle.validate(articleModifie, {abortEarly : false})
        if(error){
            // afficher des erreurs dans la zone d'erreur sous formulaire 
            for (let item of error.details) 
                toast.error(item.message) ;
            return ; 
        }

        articleModifie.auteur = profil._id; 
        articleModifie.file = file; 

       const reponse = await updateArticle(articleModifie , id)
       if(reponse.acknowledged === true){
        toast.success("l'article est bien mis à jour en base de données !!!")
        navigate("/admin");
        return ; 
       }else {
        toast.error(reponse.msg)
       }
    }
   
    return (
        <div className="admin">
            <h1>Modifier un article existant</h1>
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
                <select name="categorie" id="categorie" value={categorie} onChange={function(event){
                    setCategorie(event.target.value)
                }}>
                    <option value="">sélectionner une catégorie</option>
                    {categories.map(function(cat , index){
                        return <option key={index} value={cat.label} >{ cat.label }</option>
                    })}
                </select>
            </div>
            <div>
                <label htmlFor="image">image à la une</label>
                <input type="file"  id="image" name="image" onChange={handleFileChange}   />
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
            <ul className="meta">
                <li>Slug : {_.kebabCase(titre) }</li>
                <li>publié le : {dtFr(dtPublication)}</li>
            </ul>
            <div>
                <input type="submit" value="modifier l'article"/>
            </div>
            </form>
        </div>

    )
}
export default AdminAddArticle ;