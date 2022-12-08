import { Component } from "react"
import { connect } from "react-redux"
import BtnDelete from "./BtnDelete"

class Liste extends Component {
    
    render(){
        return <ul className="mt-4">
            {this.props.elements.map( item => {
                return  <li key={item}><BtnDelete value={item} /> -  {item} </li>
            } ) }       
        </ul>
    }
}

function mapStateToProps(state){ 
    return {
        elements : state
    }
}

export default connect(mapStateToProps)(Liste)