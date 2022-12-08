import  Like  from "./Like" ; 
import { useDispatch } from "react-redux";
import { deleteArticle , getArticles  , updateArticle   } from "../action/post.action";
import {useState} from "react";

const Article = (props) => {
    const {title , body , auteur , like, id , picture} = props.article;
    const [bodyModif, setBodyModif] = useState(body);
    const [edition, setEdition] = useState(false);
    const dispatch = useDispatch();
    const handleClick = (id) =>{
        // alert(id);
        dispatch(deleteArticle(id));
       // dispatch(getArticles());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const articleModifie = {
            id : id ,
            body : bodyModif
        }
        dispatch(updateArticle(articleModifie));
        setEdition(false); 
        dispatch(getArticles());
    }
    const formulaire = <form onSubmit={handleSubmit}>
        <input type="hidden" value={id}/>
        <textarea value={bodyModif} className="form-control" rows="6" onChange={(e) => setBodyModif(e.currentTarget.value)}></textarea>
        <input type="submit" className="btn btn-success mt-3" value="valider modif"/>
    </form> 

    return <div className="col-6">
        <article className="card mb-4">
            <header className="card-header">
                <h2 className="mb-0">{title}</h2>
            </header>
            <div className="card-body">
                <img src={picture} alt="" className="img-thumbnail mb-2"/>
                {edition ? formulaire  :  <p className="mb-0">{body}</p> }
            </div>
            <footer className="card-footer d-flex justify-content-between">
                {/* <p className="mb-0">{auteur}</p> */}
                <div>
                    <button className="btn btn-danger" onClick={() => {handleClick(id)}}> supprimer </button>
                    <button className="btn btn-warning ms-3" onClick={() => setEdition(!edition)}> modifier </button>
                </div>
                <Like nb={like} id={id}/>
            </footer>
        </article>
    </div>
}
export default Article ;