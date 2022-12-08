// requete en base de données via axios 
// => yarn add axios
// npm i axios
import axios from "axios";

export const GET_ARTICLES = "GET_ARTICLES";
export const ADD_ARTICLE = "ADD_ARTICLE";
export const DELETE_ARTICLE = "DELETE_ARTICLE";
export const UPDATE_ARTICLE = "UPDATE_ARTICLE";
export const PLUS_UN_LIKE = "PLUS_UN_LIKE";

const url = "http://localhost:3004/articles"

export const updateArticle = (article) => {
    return (dispatch) => {
        axios.patch( `${url}/${article.id}`, article)
        .then(()  => { dispatch({type : UPDATE_ARTICLE , payload : article }) })
        .catch((err) => new Error(err))
    }
}

export const createArticles = (data) => {
    //console.log(data)
    return (dispatch) => {
        return axios.post("http://localhost:3004/articles" , data)
            .then( (res) => dispatch({type : ADD_ARTICLES , payload : data}) )
            .catch((err)=> {console.log(new Error(err))})
    }
}

export const getArticles = () => {
    return (dispatch) => {
        return axios.get(url)
               .then((reponse) => { dispatch({type: GET_ARTICLES , payload : reponse.data}) })
               .catch((err) => console.log(new Error(err)))
    }
}

export const addArticle = ( article ) => {
    return (dispatch) => {
        return axios.post(url, article)
                .then((reponse) => {dispatch({type:ADD_ARTICLE , payload : reponse.data})})
                .catch((err) => console.log(new Error(err)))
    }
}

export const deleteArticle = (id) => {
    return (dispatch) => {
        axios.delete(`${url}/${id}`)
            .then((reponse) => { dispatch({type: DELETE_ARTICLE , payload : id } ) })
            .catch((err => console.log(new Error(err))))
    }
}

export const plusUnLike = (id, nb) => {
    return (dispatch) => {
        axios.patch(`${url}/${id}` , {like : nb + 1} , {
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
            .then((reponse) => { dispatch({type: PLUS_UN_LIKE , payload : { id : id , like : nb + 1  } } ) })
            .catch((err => console.log(new Error(err))))
    }
}