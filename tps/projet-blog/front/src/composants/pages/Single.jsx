import { useParams , Link , useNavigate } from "react-router-dom"
import { useState , useEffect } from "react"
import { getOneById } from "../../services/article.js"
import { dtFr , aujourdhui } from "../../utils/functions.js"
import { validCommentaire } from "../../utils/validation.js"
import InputText from "../commun/InputText.jsx"
import Textarea from "../commun/Textarea.jsx"
import Img from "../commun/Img.jsx"
import _ from "lodash"
import {toast} from "react-toastify"
import { addCommentaire } from "../../services/commentaire.js"

function Single(){
    const params = useParams()
    const navigate = useNavigate()
    const [nom, setNom]= useState("")
    const [message, setMessage]= useState("");
    const [article, setArticle] = useState({})
    const [errors, setErrors] = useState([])
    useEffect( function(){

        async function init(){
            const dbArticle = await getOneById(idArticle)
            if(dbArticle.msg ){ 
                navigate("/404"); 
                return ;
            }
            setArticle(dbArticle)
        }
        const idArticle = params.id
        if(idArticle){
            init()
        }
    } , [] )

    async function onSubmit(event){
        event.preventDefault()
        const commentaire = {nom, message}
       const {error} = validCommentaire.validate(commentaire, {abortEarly: false})
        if(error){
            for (let item of error.details) 
                toast.error(item.message) ;
            return 
        } 
        // ajouter à notre base de données temporaire
        const cloneArticle = {...article};
        
        commentaire.dt_publication = aujourdhui;

        //debugger; 
        await addCommentaire( commentaire , params.id  );
        
        cloneArticle.commentaires = [...article.commentaires]
        cloneArticle.commentaires.push(commentaire);
        setArticle(cloneArticle);
        // vider le formulaire  
        setNom("");
        setMessage(""); 
    }

    return (<div className="single">
        <Link to="/" className="lien">retour</Link>
        <h1>{article.titre}</h1>
        <div className="grille">
            <Img src={article.img} alt={article.titre} className={'img-fluid'} />
            <p>{article.contenu}</p>
        </div>
        <hr/>
        { article.commentaires && article.commentaires.length === 0 && <p className="no-comment">Aucun commentaire dans cet article</p>}
        { article.commentaires && article.commentaires.length > 0 && article.commentaires.map(function(commentaire, index){
            return (
                <article key={index} className="commentaire">
                    <h3>{commentaire.nom}</h3>
                    <p>{commentaire.message}</p>
                    <footer>{dtFr(commentaire.dt_publication)}</footer>
                </article>
            )
        }) }
        <hr />
        <form onSubmit={onSubmit}>
            <InputText 
                placeholder="votre nom"
                id="nom"
                label="votre Pseudo"
                action={function(event){
                    setNom(event.target.value)
                    setErrors([])
                }}
                value={nom}
            />
            <Textarea 
                id="message"
                label="votre message"
                placeholder="votre message"
                action={ function(event){
                    setMessage(event.target.value)
                    setErrors([])
                }}
                value={message}
            />
            <div>
                <input type="submit" value="envoyer"/>
            </div>
            <div>
                {errors.map(function(erreur,index){
                    return (<div key={index}>{erreur}</div>)
                })}
            </div>
        </form>
    </div>)
}

export default Single ;