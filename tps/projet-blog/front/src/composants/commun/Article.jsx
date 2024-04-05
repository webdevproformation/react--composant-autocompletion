import { Link } from "react-router-dom"
import { dtFr } from "../../utils/functions.js"
import Img from "./Img.jsx"
import _ from "lodash"

function Article(props){
    return (
        <article className="article-home">
            <figure>
            <Link to={`/article/${props.valeur._id}/${_.kebabCase(props.valeur.titre)}`}>
            <Img src={props.valeur.img} alt={props.valeur.titre} className={'thumbnail-home'}/>
            </Link>
            </figure>
            <h2>
                <Link to={`/article/${props.valeur._id}/${_.kebabCase(props.valeur.titre)}`}>{props.valeur.titre}</Link>
            </h2>
            <div>
                <ul className="meta">
                    <li> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-week-fill" viewBox="0 0 16 16">
                <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M9.5 7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5m3 0h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5M2 10.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5"/>
            </svg>&nbsp;{dtFr(props.valeur.dt_publication) }</li>
                    <li>
                        <span className={`badge ${_.kebabCase(props.valeur.categorie)}`}>

                      
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark-star" viewBox="0 0 16 16">
  <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.18.18 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.18.18 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.18.18 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.18.18 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.18.18 0 0 0 .134-.098z"/>
  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
</svg>&nbsp;{props.valeur.categorie}

</span></li>
                </ul>
           

                
            </div>
            <p>{props.valeur.contenu.slice(0, 100) } ...</p>
            
        </article>
    )
}
export default Article 