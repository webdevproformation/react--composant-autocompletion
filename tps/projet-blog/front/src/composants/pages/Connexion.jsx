import InputText from "../commun/InputText"
import {useState , useContext} from "react"
import { UserContext } from "../../context/userContext"
import { validUser } from "../../utils/validation.js"
import { login as loginAjax } from "../../services/user.js"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

function Connexion(){
    const { login  } = useContext(UserContext); 
    const navigate = useNavigate();
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")

    async function onSubmit(event){
        event.preventDefault();
        const nouveauProfil = {email , password};
        // vérification avant de faire la requête ajax
        const {error} = validUser.validate(nouveauProfil , {abortEarly : false})
        if(error){
            // afficher des erreurs dans la zone d'erreur sous formulaire 
            for (let item of error.details) 
                toast.error(item.message) ;
            return ; 
        }
        const reponse = await loginAjax(nouveauProfil);

        if(reponse.token){
            login(reponse.token); // on passe le token dans le state 
            setEmail("")
            setPassword("");
            navigate("/admin"); 
        }else {
            toast.error(reponse.msg)
        }
    }

    return <div className="login">
            <h1>Accéder au back office</h1>
            <form onSubmit={onSubmit}>
                <InputText 
                    type="email"
                    value={email}
                    placeholder="votre@email"
                    label="saisir votre email"
                    action={function(event){
                        setEmail(event.target.value)
                    
                    }}
                />
                <InputText 
                    type="password"
                    value={password}
                    placeholder="votre mot de passe"
                    label="saisir votre mot de passe"
                    action={function(event){
                        setPassword(event.target.value)
                       
                    }}
                />
                <div>
                    <input type="submit"  value="connexion"/>
                </div>
            </form>
    </div>
}
export default Connexion