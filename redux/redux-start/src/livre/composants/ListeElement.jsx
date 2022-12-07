import React , { Component  } from "react";
import { remove , modify } from "../action";

export class ListeElement extends Component{

    constructor(props){
        super(props);
        this.state = { show : true , input : props.element.value }
    }

    handleDoubleClick(){
        this.setState({show : !this.state.show})
    }

    handleChange(e){
        this.setState({input : e.target.value})
    }

    handleKeyUp( e , ukey ){
        if(e.key === "Enter"){
            this.props.store.dispatch(modify( ukey ,  e.target.value))
            this.setState({show : !this.state.show})
        }
    }

    handleBlur( e , ukey ){
        this.props.store.dispatch(modify( ukey ,  e.target.value))
        this.setState({show : !this.state.show})
    }

    delete(id){
        this.props.store.dispatch(remove(id))
    }

    render(){
        return <div className="my-3">
                
                {this.state.show 
                ?
                    <span className="w-40 inline-block" onDoubleClick={this.handleDoubleClick.bind(this)}>{this.props.element.value}</span>  
                : 
                    <input type="text" className="border-black border-2 rounded mr-2 px-2 py-1 focus:border-transparent w-40" value={this.state.input} 
                        onChange={this.handleChange.bind(this)} 
                        onKeyUp={(e) => this.handleKeyUp.call(this , e , this.props.element.ukey)}
                        onBlur={(e) => this.handleBlur.call(this , e , this.props.element.ukey)}/>
                }
                <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded text-xs" onClick={() => this.delete.call(this, this.props.element.ukey )}>delete</button>
            </div>
    }
}