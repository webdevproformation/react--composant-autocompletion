import { Component } from "react"
import { find } from "../action"

export class InputSearch extends Component{

    constructor(props){
        super(props)
        this.state = {searchedWord : ""}
    }

    handleChange(e){
        this.setState({searchedWord : e.target.value})
        this.props.store.dispatch(find(e.target.value))
    }

    render(){
        return <>
            <input type="text" className="border-black border-2 rounded ml-2 text-sm p-1 focus:border-transparent w-40" value={this.state.searchedWord} 
                        onChange={this.handleChange.bind(this)}
                        placeholder="mot recherché" />
        </>
    }
}

