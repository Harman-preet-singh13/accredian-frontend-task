import React from "react";
import { Button } from "@mui/material";
import {  useAuth} from "./AuthContext"
import {  useNavigate } from 'react-router-dom';


export default function Dashboard() {
  
  const {authenticated, logout, username} = useAuth();
  const navigate = useNavigate();

  console.log(username)
  return (
    <>
    {!authenticated &&(
      <>
      {navigate('login')}
      </>
    )}
    {authenticated &&
    (<main className="dashboard-container">
      <div className="dashboard">
        <h2>
          Hey there <span className="dashboard-username">{username}</span>
        </h2>
        <p>
            You are logged into accredian home page.
        </p>
        <Button
        variant="contained"
        onClick={logout}
        >
         Log out
        </Button>
      </div>
    </main>)
    }
    
    </>
   
  );
}
