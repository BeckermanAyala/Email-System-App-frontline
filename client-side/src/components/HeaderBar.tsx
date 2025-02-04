import React from "react";
import { AppBar, Toolbar, Button, TextField, IconButton, Box, Avatar } from "@mui/material";
import { Inbox, Outbox, Drafts } from "@mui/icons-material";

const HeaderBar = () => {
    return (
        <AppBar position="static" color="default" sx={{ boxShadow: 1, padding: 1 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="contained" color="primary" startIcon={<Inbox />} sx={{ backgroundColor: "#1C2B49" }}>Inbox</Button>
                    <Button variant="outlined" startIcon={<Outbox />} sx={{ color: "#1C2B49", borderColor: "#1C2B49" }}>Outbox</Button>
                    <Button variant="outlined" startIcon={<Drafts />} sx={{ color: "#1C2B49", borderColor: "#1C2B49" }}>Draft</Button>
                </Box>

                <TextField variant="outlined" placeholder="Search" size="small" sx={{ width: 300 }} />

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button variant="contained" color="primary" sx={{ backgroundColor: "#1976D2", padding: "6px 16px" }}>New Email</Button>
                    <IconButton><Avatar sx={{ bgcolor: "#FF8C00" }}>YP</Avatar></IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderBar;