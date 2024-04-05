import notPicture from "../../assets/default-400x200.png"

function Img(props){

    const url = import.meta.env.VITE_API; 

    const className= props.className ? props.className : "thumbnail"

    if(props.src){
        return <img src={`${url}/img/${props.src}`} alt={props.alt} className={className} />
    }
    return <img src={notPicture} alt={props.alt} className={className} />
   

}

export default Img