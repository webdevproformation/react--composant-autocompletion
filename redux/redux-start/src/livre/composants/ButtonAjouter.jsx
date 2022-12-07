import { Component } from "react"
import { add } from "../action"

export class ButtonAjouter extends Component{

    add (){
       this.props.store.dispatch(add(`add ${Date.now()}`)) 
    }

    render(){
        return <>
            <button 
                onClick={this.add.bind(this)}
                className="bg-transparent hover:bg-emerald-500 text-emerald-700 font-semibold hover:text-white py-1 px-3 border border-emerald-500 hover:border-transparent rounded text-xs"
            >
                Ajouter
            </button>
        </>
    }
}