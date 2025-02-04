import React from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material";

const EmailList = ({ setSelectedEmail }) => {
    const emails = [
        { id: 1, sender: "Bob Marley", subject: "Important meeting about project", preview: "Hey, I just wanted to remind you that...", time: "7:50 PM", avatar: "BM" },
        { id: 2, sender: "Stephan King", subject: "New Book Announcement", preview: "We are excited to announce that the boo...", time: "1:30 AM", avatar: "SK" },
        { id: 3, sender: "UI Tutorials", subject: "How to Use Placeholder Text and Images", preview: "A great email marketing campaign starts...", time: "5:32 PM", avatar: "UT" },
    ];

    return (
        <List>
            {emails.map((email) => (
                <ListItem key={email.id} button onClick={() => setSelectedEmail(email)} sx={{ borderBottom: "1px solid #f0f0f0" }}>
                    <ListItemAvatar><Avatar>{email.avatar}</Avatar></ListItemAvatar>
                    <ListItemText
                        primary={<Typography sx={{ fontWeight: 600 }}>{email.sender}</Typography>}
                        secondary={<Typography sx={{ fontSize: "0.875rem", color: "gray" }}>{email.preview} — {email.time}</Typography>}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default EmailList;