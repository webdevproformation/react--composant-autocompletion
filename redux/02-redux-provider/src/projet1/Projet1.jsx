import { BtnAdd } from "./components/BtnAdd";
import { configureStore , applyMiddleware } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { Liste } from "./components/Liste";

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

function Projet1(){
  return (
    <Provider store={store}>
        <h1 className="text-3xl mb-3">React + Redux + react-redux <small>fonction</small></h1>
        <div>
          <BtnAdd />
        </div>
        <Liste />
    </Provider>
  )
}

export default Projet1 ;