import EmailList from "./EmailList.jsx";
import EmailViewer from "./EmailViewer.jsx";
import HeaderBar from "./HeaderBar.jsx";
import SignInPage from "./SignIn.jsx";
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import CreateEmail from "./NewEmail.jsx";
import { setAuthToken, fetchEmails } from "../api";

const MainManager = () => {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(false); 
    const [isComposeOpen, setIsComposeOpen] = useState(false); 
    const [activeStatus, setActiveStatus] = useState("inbox"); 
    const [emails, setEmails] = useState([]); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setAuthToken(token); 
            setIsSignedIn(true); 
        }
    }, []);

    
    useEffect(() => {
        if (isSignedIn) {
            const loadEmails = async () => {
                try {
                    const data = await fetchEmails(activeStatus); 
                    setEmails(data);
                } catch (error) {
                    console.error("Error fetching emails:", error);
                }
            };
            loadEmails();
        }
    }, [activeStatus, isSignedIn]);

    if (!isSignedIn) {
        return <SignInPage onSignIn={() => setIsSignedIn(true)} />;
    }

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <HeaderBar
                activeStatus={activeStatus}
                setActiveStatus={setActiveStatus}
                onCompose={() => setIsComposeOpen(true)}
            />

            <Grid container sx={{ flex: 1 }}>
                <Grid item xs={4} sx={{ padding: 2 }}>
                    <EmailList emails={emails} setSelectedEmail={setSelectedEmail} />
                </Grid>

                <Grid item xs={8} sx={{ padding: 2 }}>
                    {selectedEmail ? (
                        <EmailViewer email={selectedEmail} />
                    ) : (
                        <Typography variant="body1" color="textSecondary">
                            Select an email to view its details.
                        </Typography>
                    )}
                </Grid>
            </Grid>

            <CreateEmail open={isComposeOpen} onClose={() => setIsComposeOpen(false)} />
        </Box>
    );
};

export default MainManager;
