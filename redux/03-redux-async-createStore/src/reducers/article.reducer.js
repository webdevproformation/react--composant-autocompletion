import { 
    GET_ARTICLES , 
    ADD_ARTICLE , 
    DELETE_ARTICLE , 
    UPDATE_ARTICLE , 
    PLUS_UN_LIKE } from "../action/post.action";

const initialState = [] ;

export default function articleReducer(state = initialState , action){
    switch(action.type){
        case GET_ARTICLES :
            return action.payload
        case ADD_ARTICLE :
            return [action.payload,...state]
        case DELETE_ARTICLE : 
            return state.filter((item) => { return item.id !== action.payload})
        case UPDATE_ARTICLE :
            const cloneState = [...state];
            const articleAModifier = cloneState.find((article) => { return article.id ===  action.payload.id });
            const index = cloneState.indexOf(articleAModifier);
            cloneState[index].body = action.payload.body ; // update 
            return cloneState ; // retourner le state modifié
        case PLUS_UN_LIKE : 
            const cloneState2 = [...state];
            const articleAModifierPlus = cloneState2.find((article) => { return article.id ===  action.payload.id });
            const indexPlus = cloneState2.indexOf(articleAModifierPlus);
            cloneState2[indexPlus].like = action.payload.like ; // update 
            return cloneState2 ; // retourner le state modifié
        default : 
            return initialState
    }
}