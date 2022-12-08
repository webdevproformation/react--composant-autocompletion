import { useDispatch } from "react-redux"

export function BtnDelete ({value}){
    const dispatch = useDispatch()

    const suppr = () => {
        dispatch({type: "DELETE" , payload : value})
    }

    return <button className="bg-transparent hover:bg-fuchsia-500 text-fuchsia-700 font-semibold hover:text-white py-1 px-3 border border-fuchsia-500 hover:border-transparent rounded text-xs" onClick={suppr} >Supprimer</button>
}