import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";


export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  const handleRegister = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Password and confirmation password do not match");
        return;
      }

      const response = await axios.post("http://localhost:8000/register", {
        username,
        email,
        password,
      });

      console.log(response.data);
      
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
      console.error(error.response.data);
    }
  };

  return (
    <main>
      <div className="form-contianer">
        <div className="form-border">
          <header>
            <h2>Register Now</h2>
            <p>
              Already have an account?{" "}
              <button onClick={handleClick} className="blue-link">
                Log in
              </button>
            </p>
          </header>

          <form>
            <Stack spacing={5}>
              <TextField
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                label="Username"
                variant="standard"
              />
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="standard"
              />
              <TextField
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="standard"
              />
                            <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                label="Confirm Password"
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Button
                variant="contained"
                style={{
                  width: "100px",
                  marginInline: "auto",
                }}
                onClick={handleRegister}
              >
                Sign Up
              </Button>
            </Stack>
          </form>
        </div>
      </div>
    </main>
  );
}
