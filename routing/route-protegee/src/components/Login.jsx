import React from 'react'
import { authContext } from './authContext'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const {login} = React.useContext(authContext)

    const handleLogin = () => {
        login().then(() => {
            navigate("/dashboard")
        })
    }

  return (
    <div className="card mt-5 text-center">
      <div className="card-body">
        Formulaire de login 
        <div>
            <button className="btn btn-dark" onClick={handleLogin}>
              Log in
            </button>
        </div>
      </div>
    </div>
  )
}

export default Login