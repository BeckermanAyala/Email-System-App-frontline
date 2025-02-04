import EmailList from "./components/EmailList.tsx";
import EmailViewer from "./components/EmailViewer.tsx";
import HeaderBar from "./components/HeaderBar.tsx";
import SignInPage from "./components/SignIn.tsx";


import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

const App = () => {
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(false);

    if (!isSignedIn) {
        return <SignInPage onSignIn={() => setIsSignedIn(true)} />;
    }

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <HeaderBar />
            <Grid container sx={{ flex: 1 }}>
                <Grid item xs={4} sx={{ padding: 2 }}>
                    <EmailList setSelectedEmail={setSelectedEmail} />
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
        </Box>
    );
};

export default App;