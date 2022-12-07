import _ from "lodash";
import { Component } from "react"
import { ListeElement } from "./ListeElement";

export class Liste extends Component{

    constructor(props){
        super(props);
        this.state = props.store.getState()
    }

    componentDidMount() {
        this.unsubscrire = this.props.store.subscribe(() => {
            this.setState(this.props.store.getState())
        })
    }

    componentWillUnmount() {
        this.unsubscrire();
    } 

    render(){
        const { values , resultat } = this.state
        const { store } = this.props
        return <>
         { resultat.length === 0  ? 
            values.map((element) => {
                return <ListeElement key={element.ukey} element={ element} store={ store } />
            }) :
            resultat.map((element) => {
                return <ListeElement key={element.ukey} element={ element} store={ store } />
            })  
            } 
        </>
    }
}