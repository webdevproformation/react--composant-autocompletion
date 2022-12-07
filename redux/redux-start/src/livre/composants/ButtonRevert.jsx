import { Component } from "react"
import { revert } from "../action"

export class ButtonRevert extends Component{

    render(){
        return <>
            <button 
                onClick={( ) => this.props.store.dispatch(revert())}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded text-xs ml-3"
            >
                Revert
            </button>
        </>
    }
}