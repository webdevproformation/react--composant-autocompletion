import * as ACTIONS from "./action_type";
import _ from "lodash"

const initialState = {
    values : [],
    revert : false,
    resultat : []
}

export function reducer(state  = initialState , action){
    let cloneState = _.cloneDeep(state);
    switch(action.type){
        case ACTIONS.ADD: 
            cloneState.values.push(action.payload)
            return { ...state , values : cloneState.values};

        case ACTIONS.REMOVE : 
            console.log(cloneState.values.filter( item => item.ukey !== action.payload ) , action.payload)
            const filterState = cloneState.values.filter( item => item.ukey !== action.payload )
            return { ...state , values : filterState};

        case ACTIONS.MODIFY : 
            const mapState = cloneState.values.map((item, index) => {
                if(item.ukey === action.payload.ukey) return {...item , value : action.payload.value } ;
                else return  item ;
            })
            return { ...state , values : mapState } ;

        case ACTIONS.REVERT : 
            cloneState.values.reverse()
            return {...state , values : cloneState.values , revert : !cloneState.revert}

        case ACTIONS.FIND :
            const result = cloneState.values.filter(item => {
                return item.value.indexOf(action.payload  ) >= 0
            })

            return {...state , resultat : result}

        default : 
            return state ;
    }
}