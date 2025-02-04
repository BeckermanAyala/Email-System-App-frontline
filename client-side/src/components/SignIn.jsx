import React, { useState } from "react";
import {Avatar,Button,CssBaseline,TextField,Paper,Box,Grid,Typography,Alert,} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login, register, setAuthToken } from "../api";

const SignInPage = ({ onSignIn }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const { token } = await login(email, password);
            setAuthToken(token);
            localStorage.setItem("token", token); 
            onSignIn(); 
        } catch (error) {
            setError("Invalid email or password");
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            await register(name, email, password);
            alert("User registered successfully. Please log in.");
            setIsRegistering(false);
        } catch (error) {
            setError("Error registering user");
        }
    };

    return (
        <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: "url(https://source.unsplash.com/random)",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: (t) =>
                        t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {isRegistering ? "Register" : "Sign In"}
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={isRegistering ? handleRegister : handleLogin}
                        sx={{ mt: 1 }}
                    >
                        {isRegistering && (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <Alert severity="error">{error}</Alert>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isRegistering ? "Register" : "Sign In"}
                        </Button>
                        <Button
                            fullWidth
                            variant="text"
                            onClick={() => setIsRegistering(!isRegistering)}
                        >
                            {isRegistering
                                ? "Already have an account? Sign in"
                                : "Don't have an account? Register"}
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SignInPage;
