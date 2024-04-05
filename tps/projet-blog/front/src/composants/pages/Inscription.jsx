import InputText from "../commun/InputText"
import {useState} from "react"
import { validUser } from "../../utils/validation.js"
import { register } from "../../services/user.js"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

function Inscription(){
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

            for (let item of error.details){
                console.log(item)
                toast.error(`${item.message}`, {
                    theme: "colored"
                  }) ;
            } 
               

            return ; 
        }
        const reponse = await register(nouveauProfil)

        if(reponse._id){
            setEmail("")
            setPassword(""); 
            toast.success("Votre profil a bien été créé, vous pouvez désormais vos connecter avec vos identifiants")
            navigate("/login")
        }else {
            toast.error(reponse.msg)
        }
    }

    return <div className="inscription">
            <h1>Vous créez un profil rédacteur</h1>
            <p>Veuillez utiliser le formulaire ci-dessous :</p>
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
                    <input type="submit"  value="créer votre profil"/>
                </div>
            </form>
    </div>
}
export default Inscription