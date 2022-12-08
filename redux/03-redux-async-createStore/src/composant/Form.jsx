import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createArticles } from "../action/post.action";

const Form = () => {

    const [article , setArticle]= useState(() => {return {title : "" , body : ""}})
    const users = useSelector(state => state.userReducer)
    const dispatch = useDispatch();

    const submit = e => {
        e.preventDefault();
        if(article.title && article.body){
           const data = {
                    title : article.title,
                    body : article.body,
                    author : users[0].nom,
                    picture : "https://via.placeholder.com/600x300",
                    like : 0
            };
           //console.log(data);
                
            dispatch(createArticles(data)); // envoyer les données au store
            // vider les champs du formulaire
            setArticle(prevArticle => {
                return {
                    title : "",
                    body : ""
                }
            })  
        }
    }

    const change = e => {
        const {value, name} = e.currentTarget ;
        setArticle(prevArticle => {
            return { ...prevArticle, [name] : value }
        });
    }

    return <>
        <h3 className="card-title fs-5 mt-3">Créer un article</h3>
        <form onSubmit={submit}>
            <div className="form-group">
                <label htmlFor="title">title</label>
                <input type="text" name="title" id="title" className="form-control" value={article.title} onChange={change}/>
            </div>
            <div className="form-group">
                <label htmlFor="body">body</label>
                <textarea name="body" id="body" className="form-control" value={article.body} onChange={change}></textarea>
            </div>
            <div className="form-group mt-3 d-flex justify-content-end">
                <input type="submit" className="btn btn-outline-success" />
            </div>
        </form>
    </>
}

export default Form ;