import { configureStore } from "@reduxjs/toolkit"
import { useRef, useState } from "react"

const initialState = []

function reducer (state = initialState, action){
  switch(action.type){
    case "ADD" :
      //console.log("ici")
      const cloneState = [...state];
      cloneState.push(action.payload)
      return cloneState;
    case "DELETE" :
      return state.filter(item => item !== action.payload);
    default :
     return state
  }
  
}

const store = configureStore({reducer})

store.dispatch({type : "ADD", payload : "decouverte"})
store.dispatch({type : "ADD", payload : "de"})
store.dispatch({type : "ADD", payload : "Redux"})

function MyRedux() {
  const inputRef = useRef()

  const [elements, setElements] = useState(() => store.getState())
  
  store.subscribe(function(){
    console.log(store)
    setElements(store.getState())
  })

  function handleClick(){
    if(inputRef.current.value !== ""){
      store.dispatch({type : "ADD", payload : inputRef.current.value})
      inputRef.current.value = "";
    }
  }

  function handleKeyup(e){
    if(e.code === "Enter" && inputRef.current.value !== ""){
      store.dispatch({type : "ADD", payload : inputRef.current.value})
      inputRef.current.value = "";
    }
  }

  return (
    <div className="App">
        <h2 className="text-3xl">My Redux</ h2>
        <input type="text" ref={inputRef} onKeyUp={handleKeyup} className="border-black border-2 rounded my-3 px-2 py-1 mr-2 focus:border-transparent" placeholder="remplir et Enter"/>

        <button onClick={handleClick} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-xs">add</button>
        <ul>
          { elements.length > 0 
          ? elements.map( (item , index) => <li key={index}>{item}</li> )
          : <li>rien</li>  
          }
        </ul>
    </div>
  )
}

export default MyRedux
