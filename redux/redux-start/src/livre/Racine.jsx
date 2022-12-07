import { configureStore } from "@reduxjs/toolkit"
import { ButtonAjouter } from "./composants/ButtonAjouter"
import { Liste } from "./composants/Liste"
import { reducer } from "./reducer"
import { Component } from "react"
import {add ,revert} from "./action"
import { ButtonRevert } from "./composants/ButtonRevert"
import { InputSearch } from "./composants/InputSearch"

const store = configureStore({reducer});

["un","deux","trois"].forEach((value) => {
    store.dispatch(add(value))
})

export class Racine extends Component{

    render(){
        return (
            <div>  
                <h1 className="text-3xl">React et Redux</h1>
                 <ButtonAjouter  store={store} />
                 <ButtonRevert  store={store}  />
                 <InputSearch store={store} />
                 <Liste store={store}/> 
            </div>
        )
    }
} 