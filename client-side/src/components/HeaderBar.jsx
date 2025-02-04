
import React from "react";
import { AppBar, Toolbar, Button, TextField, IconButton, Box, Avatar } from "@mui/material";
import { Inbox, Outbox, Drafts } from "@mui/icons-material";

const HeaderBar = ({ activeStatus, setActiveStatus, onCompose }) => {
    return (
        <AppBar position="static" color="default" sx={{ boxShadow: 1, padding: 1 }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        variant={activeStatus === "inbox" ? "contained" : "outlined"}
                        color={activeStatus === "inbox" ? "primary" : "inherit"}
                        startIcon={<Inbox />}
                        onClick={() => setActiveStatus("inbox")}
                    >
                        Inbox
                    </Button>

                    <Button
                        variant={activeStatus === "outbox" ? "contained" : "outlined"}
                        color={activeStatus === "outbox" ? "primary" : "inherit"}
                        startIcon={<Outbox />}
                        onClick={() => setActiveStatus("outbox")}
                    >
                        Outbox
                    </Button>

                    <Button
                        variant={activeStatus === "draft" ? "contained" : "outlined"}
                        color={activeStatus === "draft" ? "primary" : "inherit"}
                        startIcon={<Drafts />}
                        onClick={() => setActiveStatus("draft")}
                    >
                        Draft
                    </Button>
                </Box>

                <TextField
                    variant="outlined"
                    placeholder="Search"
                    size="small"
                    sx={{ width: 300 }}
                />

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ backgroundColor: "#1976D2", padding: "6px 16px" }}
                        onClick={onCompose}
                    >
                        New Email
                    </Button>
                    <IconButton>
                        <Avatar sx={{ bgcolor: "#FF8C00" }}>YP</Avatar>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderBar;
