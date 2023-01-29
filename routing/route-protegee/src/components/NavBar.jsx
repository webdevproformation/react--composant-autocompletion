import { Link , useNavigate } from 'react-router-dom'
import React from "react"
import { authContext } from './authContext'
const NavBar = () => {
    const navigate = useNavigate()
    const {isAuthenticated , logout} = React.useContext(authContext)

    const handleLogout = () => {
        logout().then(() => {
            navigate("/")
        })
    }

  return (
    <nav className="navbar nav-expand ">
      <div className='nav-item'>
        <Link to="/">Home</Link>
      </div>
      {isAuthenticated && <>
        <div className='nav-item'>
            <Link to="/profile">Profile</Link>
        </div>
        <div className='nav-item'>
            <Link to="/dashboard">Dashboard</Link>
        </div>
      </>}
      {isAuthenticated ? (
          <div className='nav-item'>
            <button className="btn btn-danger" onClick={handleLogout}>
              Log out
            </button>
          </div>
        ) : <div className='nav-item'>
            <Link to="/login">login</Link>
        </div>}
    </nav>
  )
}

export default NavBar