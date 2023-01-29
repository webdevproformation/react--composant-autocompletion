import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { authContextConsumer} from "./components/authContext"
import Login from "./components/Login";

export default function App() {
  
  const { isAuthenticated } = authContextConsumer()

  return (
    <div className="container">
      <h2>React Private Routes Example</h2>
      <BrowserRouter>
        {/** https://remotestack.io/how-to-build-private-routes-in-react-with-react-router/ */}
        <NavBar  />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}