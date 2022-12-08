import { connect } from "react-redux"
import { Component } from "react";

class Timer extends Component{

    componentDidMount() {
        const interval = setInterval( () => {
            this.props.action(this.props.time)
            if(this.props.time.sec === 0 && this.props.time.min === 0){
                clearInterval(interval)
            }
        } , 1_000);
    }

    formatTime = () => {
        return `${ ("0" + this.props.time.min).slice(-2) } min : ${ ("0" + this.props.time.sec).slice(-2) }  sec`
    }

    render(){
        return <p>{ this.formatTime() }</p>
    }
}

// envoyer le store comme props 
// ajouter la propriété time sera this.props.time
// le nom de la fonction est 
function mapStateToProps(state){ 
    return {
        time : state
    }
}

function mapDispatchToProps(dispatch){
    return {
        action : function(time){
            dispatch({type:"DECREMENTER" , payload : time})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer) ;