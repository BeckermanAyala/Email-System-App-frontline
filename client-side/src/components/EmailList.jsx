
import React from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material";

const EmailList = ({ emails, setSelectedEmail }) => {
    return (
        <List>
            {emails.map((email) => (
                <ListItem
                    key={email._id}
                    button
                    onClick={() => setSelectedEmail(email)}
                    sx={{ borderBottom: "1px solid #f0f0f0" }}
                >
                    <ListItemAvatar>
                        <Avatar>{email.sender[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Typography sx={{ fontWeight: 600 }}>{email.sender}</Typography>}
                        secondary={
                            <Typography sx={{ fontSize: "0.875rem", color: "gray" }}>
                                {email.subject}
                            </Typography>
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default EmailList;
