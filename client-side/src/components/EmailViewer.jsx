import React from "react";
import { Box, Typography, Avatar, Paper } from "@mui/material";

const EmailViewer = ({ email }) => {
    return (
        <Paper sx={{ padding: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                <Avatar sx={{ marginRight: 2 }}>{email.avatar}</Avatar>
                <Box>
                    <Typography variant="h6">{email.subject}</Typography>
                    <Typography variant="body2" color="textSecondary">{email.sender}</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ marginLeft: "auto" }}>{email.time}</Typography>
            </Box>
            <Typography>
                
            </Typography>
        </Paper>
    );
};

export default EmailViewer;
