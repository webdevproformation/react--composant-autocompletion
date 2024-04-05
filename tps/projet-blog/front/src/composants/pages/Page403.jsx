import { Link } from "react-router-dom"

function Page403(){
    return (<div className="page-erreur">
        <h1>Erreur 403 <small>Vous n'êtes pas autorisé à accéder à cette page sans authentification</small></h1>
        <p>veuillez vous connecter au préalable : 
            <Link to="/login">connexion</Link>
        </p>
    </div>)
}

export default Page403;