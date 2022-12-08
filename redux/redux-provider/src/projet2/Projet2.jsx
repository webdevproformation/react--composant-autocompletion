import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import BtnAdd from "./components/BtnAdd";
import Liste from "./components/Liste";
import { Component } from "react";

const initialState = [];

function reducer(state = initialState , action){
  const cloneState = [...state]
  switch(action.type){
    case "ADD" :
      cloneState.push(action.payload)
      return cloneState ;
    case "DELETE" :
      const stateFiltre = cloneState.filter(item => item !== action.payload)
      return stateFiltre ;
    default :
      return state
  }
}
const store = configureStore({ reducer });

["un", "deux", "trois"].forEach(nb => {
  store.dispatch({type: "ADD" , payload : nb});
})

class Projet2 extends Component{
  render(){
    return (
      <Provider store={store}>
          <h1 className="text-3xl mb-3">React + Redux + react-redux <small>class</small></h1>
          <div>
            <BtnAdd />
          </div>
          <Liste />
      </Provider>
    )
  }
}

export default Projet2 ;