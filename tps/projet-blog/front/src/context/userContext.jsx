import { useState, createContext } from "react"
import { jwtDecode } from "jwt-decode";
export const UserContext = createContext();
export function UserContextProvider({ children }){
    let  defaultProfil = {}
    if(localStorage.getItem("token")){
        defaultProfil = jwtDecode(localStorage.getItem("token"))
        
    }
    const [profil, setProfil] = useState(defaultProfil)
    // formulaire de connexion
    function login(token){
        const user = jwtDecode(token)
        localStorage.setItem("token" , token)
        setProfil(user); 
    }
    // barre de menu déconnecter
    function logout(){
        setProfil({}); 
        localStorage.removeItem("token")
    }
    // barre de menu 
    function isLogged(){
        if(profil._id) return true ;
        return false ; 
    }

    function isAdmin(){
        return profil.role === "admin" || profil.role=== "traducteur"; 
    }

    return <UserContext.Provider value={{ profil,  login , logout, isLogged , isAdmin }}>
        { children }
    </UserContext.Provider>
}