import { useDispatch } from "react-redux"
import { useRef } from "react"

export const BtnAdd = () => {
    const inputRef = useRef()
    const dispatch = useDispatch();

    const add = () => {
        if(inputRef.current.value !== ""){
            dispatch({type: "ADD" , payload : inputRef.current.value})
            inputRef.current.value = "";
        }
    }

    const ajouter = (e) => {
        if(e.key === "Enter" && inputRef.current.value !== ""){
            dispatch({type: "ADD" , payload : inputRef.current.value})
            inputRef.current.value = "";
        }
    }

    return (
        <>
            <input type="text" className="border-black border-2 rounded text-sm p-1 focus:border-transparent w-60 mr-3 text-xs" ref={ inputRef } onKeyUp={(e) => { ajouter (e) }}/>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-3 border border-blue-500 hover:border-transparent rounded text-xs" onClick={add} >Ajouter</button>
        </>
    )
}