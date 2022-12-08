import { connect } from "react-redux"
import React , { Component, useRef } from "react"

class BtnAdd extends Component{

    constructor(props){
        super(props);
        this.inputRef = React.createRef()
    }
    

    add () {
        if(inputRef.current.value !== ""){
            this.props.add(this.inputRef.current.value)
            this.inputRef.current.value = "";
        }
    }

    ajouter (e) {
        if(e.key === "Enter" && this.inputRef.current.value !== ""){
            this.props.add(this.inputRef.current.value)
            this.inputRef.current.value = "";
        }
    }

    render(){
        return (
            <>
                <input type="text" className="border-black border-2 rounded text-sm p-1 focus:border-transparent w-60 mr-3 text-xs" ref={ this.inputRef } onKeyUp={(e) => { this.ajouter.call(this, e) }}/>
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded text-xs" onClick={this.add.bind(this)} >Ajouter</button>
            </>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        add : function(value){
            dispatch({type: "ADD" , payload : value})
        }
    }
}

export default connect(null, mapDispatchToProps)(BtnAdd)