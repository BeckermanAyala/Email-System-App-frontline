import React, { useState, useEffect } from "react";
import {Dialog,DialogActions,DialogContent,DialogTitle,TextField,Button,Box,IconButton,Avatar,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createEmail, updateDraft } from "../api";

const CreateEmail = ({ open, onClose }) => {
    const [emailId, setEmailId] = useState(null); 
    const [to, setTo] = useState(""); 
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState(""); 


    useEffect(() => {
        const initializeDraft = async () => {
            if (open && !emailId) {
                try {
                    const newEmailId = await createEmail({
                        sender: "example@example.com", 
                        receivers: [to || "unknown@example.com"],
                        subject: subject || "No Subject",
                        body: body || "Draft body",
                        status: "draft",
                    });
                    setEmailId(newEmailId);
                } catch (error) {
                    console.error("Error creating draft:", error);
                }
            }
        };

        if (open) {
            initializeDraft();
        } else {
            resetFields();
        }
    }, [open, emailId]);

    const resetFields = () => {
        setEmailId(null);
        setTo("");
        setSubject("");
        setBody("");
    };

    const handleUpdateDraft = async () => {
        try {
            if (emailId) {
                await updateDraft(emailId, { receivers: [to], subject, body }); 
            }
            onClose(); 
        } catch (error) {
            console.error("Error updating draft:", error);
        }
    };

    const handleSendEmail = async () => {
        try {
            if (emailId) {
                await updateDraft(emailId, {
                    receivers: [to],
                    subject,
                    body,
                    status: "outbox", 
                });
            }
            resetFields(); 
            onClose(); 
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleUpdateDraft} fullWidth maxWidth="sm">
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Compose Email</span>
                <IconButton onClick={handleUpdateDraft}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
                    <Avatar sx={{ marginRight: 2, bgcolor: "#FF8C00" }}>BM</Avatar>
                    <TextField
                        fullWidth
                        label="To"
                        variant="outlined"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        sx={{ marginRight: 1 }}
                    />
                </Box>
                <TextField
                    fullWidth
                    label="Subject"
                    variant="outlined"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    multiline
                    rows={6}
                    variant="outlined"
                    placeholder="Write your email here..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpdateDraft} color="error" variant="contained">
                    Cancel
                </Button>
                <Button onClick={handleSendEmail} color="primary" variant="contained">
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateEmail;
