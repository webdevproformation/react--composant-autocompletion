import { useReducer, useRef } from "react"

function reducer (state, action){
  switch(action.type){
    case "ADD" :
      const cloneState = [...state];
      cloneState.push(action.payload)
      return cloneState;
    case "DELETE" :
      return state.filter(item => item !== action.payload);
    default :
     return state
  }
  
}

function MyHook() {
  const inputRef = useRef()
  const [elements, dispatch] = useReducer(reducer , [])

  function handleClick(){
    if(inputRef.current.value !== ""){
      dispatch({type : "ADD", payload : inputRef.current.value})
      inputRef.current.value = "";
    }
  }

  function handleKeyup(e){
    if(e.code === "Enter" && inputRef.current.value !== ""){
      dispatch({type : "ADD", payload : inputRef.current.value})
      inputRef.current.value = "";
    }
  }

  return (
    <div className="App">
        <h2 className="text-3xl">useReducer</ h2>
        <div className="flex items-center ">
            <input type="text" ref={inputRef} onKeyUp={handleKeyup}
            className="border-black border-2 rounded my-3 mr-2 px-2 py-1 focus:border-transparent" placeholder="remplir et Enter"/>
            
            <button onClick={handleClick} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-xs">add</button>
        </div>
        
        <ul>
          { elements.length > 0 
          ? elements.map( (item , index) => <li key={index}>{item}</li> )
          : <li>rien</li>  
          }
        </ul>
    </div>
  )
}

export default MyHook
