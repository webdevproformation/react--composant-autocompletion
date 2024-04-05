const url = import.meta.env.VITE_API; 

export async function register(profil){
    const options = { 
        method : "POST" , 
        body : JSON.stringify(profil) , 
        headers: { 'Content-Type': 'application/json' }
    }
    const reponse = await fetch(`${url}/add-profil`, options);
    const user = await reponse.json()
    return user
}

export async function login(profil){
    const options = { 
        method : "POST" , 
        body : JSON.stringify(profil) , 
        headers: { 'Content-Type': 'application/json' }
    }
    const reponse = await fetch(`${url}/login`, options);
    const user = await reponse.json()
    return user
}