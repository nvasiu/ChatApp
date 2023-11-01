import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Paper, Typography, InputLabel, Input, FormControl, Alert } from "@mui/material";
import { useUserAuth } from "../context/UserAuthContext";
import "../styles/SignupAndLogin.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { logIn } = useUserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await logIn(email, password);
            navigate("/home");
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }

    return (

        <div>
            <Paper className="infoBox">
                <Typography component="h1" variant="h5">Log In To Your Account</Typography>

                {error ? <Alert className="error" severity="error">{error}</Alert> : null}

                <form onSubmit={handleSubmit}>

                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="email" >Email Address</InputLabel>
                        <Input id="email" name="email" type="email" autoFocus onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>

                    <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="password" >Password</InputLabel>
                        <Input id="password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
                    </FormControl>

                    <Button className="button" type="submit" variant="contained" fullWidth color="primary">Log In</Button>

                </form>
            </Paper>

            <Paper className="linkBox">
                <Typography>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </Typography>
            </Paper>
        </div>

    );
};

export default Login;