import { Component } from "react"
import { connect } from "react-redux"

class BtnDelete extends Component {

    suppr () {
        this.props.suppr(this.props.value)
    }

    render(){
        return (
            <button className="bg-transparent hover:bg-fuchsia-500 text-fuchsia-700 font-semibold hover:text-white py-1 px-3 border border-fuchsia-500 hover:border-transparent rounded text-xs" onClick={this.suppr.bind(this)} >
                Supprimer
            </button>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        suppr : function(value){
            dispatch({type: "DELETE" , payload : value})
        }
    }
}

export default connect(null, mapDispatchToProps)(BtnDelete)

