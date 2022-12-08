import {useSelector} from "react-redux"
import { BtnDelete } from "./BtnDelete"

export const Liste = () => {
    const elements = useSelector((state) => state)
    return <ul className="mt-4">
        {elements.map( item => {
            return  <li key={item}><BtnDelete value={item} /> -  {item} </li>
        } ) }       
    </ul>
}