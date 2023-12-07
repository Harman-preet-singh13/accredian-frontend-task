import React from 'react'
import {Link} from "react-router-dom";
import {useAuth} from "./AuthContext";

export default function Navbar() {

  const {authenticated, logout} = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="navbar-heading">
            <Link to="/">
              accredian
            </Link>
        </h1>
        <ul className="side-link">
          {!authenticated && (
            <>
            <li className="link">
              <Link to="/signup">
                Sign Up
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                  Login
              </Link>
            </li>
            </>
          )}
          {
            authenticated && (
              <li className="link">
                <button
                onClick={logout}
                >
                  Logout
                </button>
              </li>
            )
          }
        </ul>
      </div>
    </nav>
  )
}
