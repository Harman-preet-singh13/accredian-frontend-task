import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";


import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      console.log(response.data);

      login(email);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      console.error(error.response.data);
    }
  };

  const handleClick = () => {
    navigate("/signup");
  };
  return (
    <main>
      <div className="form-contianer">
        <div className="form-border">
          <header>
            <h2>Log In</h2>
            <p>
              Don't have an account?{" "}
              <button onClick={handleClick} className="blue-link">
                Sign Up
              </button>
            </p>
          </header>

          <form>
            <Stack spacing={5}>
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="standard"
              />
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
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
                onClick={handleLogin}
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
