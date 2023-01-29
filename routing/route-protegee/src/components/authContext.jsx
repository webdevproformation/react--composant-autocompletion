import { createContext , useState , useContext } from "react";

export const authContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [isAuthenticated, setLoggedin] = useState(false);

    const login = () => {
        return new Promise((resolve) =>{
            setLoggedin(true);
            resolve()
        })
      };
    
      const logout = () => {
        return new Promise((resolve) =>{
            setLoggedin(false);
            resolve()
        })
      };
    
    return <authContext.Provider value={{isAuthenticated , login, logout}}>
        {children}
    </authContext.Provider>
}

export function authContextConsumer (){
    return useContext(authContext)
}