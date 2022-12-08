import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import Timer from "./Timer";

const initialState = { min : 2 , sec : 0 };

function decrTime({min, sec}){
    sec = sec - 1 ;
    if(sec < 0){
        min = min - 1 ;
        if(min < 0){
            min = 0 ;
            sec = 0 ;
        }else {
            sec = 59 ;
        }
    }
    return {min, sec}
}


function reducer ( state = initialState , action ){
    switch(action.type){
        case "DECREMENTER" :
            const newTime = decrTime(action.payload)
            return { ...state , ...newTime } ;
        default :
            return state ;
    }
}

const store = configureStore({reducer})

export const Projet2 = () => {
    return <Provider store={store}>
        <h1 className="text-3xl mb-3">Timer avec Redux <small>class</small></h1>
        <Timer />
    </Provider>
}