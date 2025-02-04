const emailService = require("../services/emailService");

exports.getInboxEmails = async (req, res) => {
    try {
        console.log("User details from token:", req.user);

        const userEmail = req.user.email;
        if (!userEmail) {
            return res.status(400).json({ error: "User email is required" });
        }

        const emails = await emailService.getInboxEmails(userEmail);

        res.status(200).json({ success: true, emails });
    } catch (error) {
        console.error("Error in emailController.getInboxEmails:", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.getOutboxEmails = async (req, res) => {
    try {
        console.log("User details from token:", req.user);

        const userEmail = req.user.email;
        if (!userEmail) {
            return res.status(400).json({ error: "User email is required" });
        }

        const emails = await emailService.getOutboxEmails(userEmail);

        if (emails.length === 0) {
            return res.status(404).json({ message: "No outbox emails found" });
        }

        res.status(200).json({ success: true, emails });
    } catch (error) {
        console.error("Error in emailController.getOutboxEmails:", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.getDraftEmails = async (req, res) => {
    try {
        console.log("User details from token:", req.user); 

        const userEmail = req.user.email;
        if (!userEmail) {
            return res.status(400).json({ error: "User email is required" });
        }

        const emails = await emailService.getDraftEmails(userEmail);

        res.status(200).json({ success: true, emails });
    } catch (error) {
        console.error("Error in emailController.getDraftEmails:", error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.createEmail = async (req, res) => {
    try {
        console.log("Received request to create an email");

        const { receivers, sender, subject, body } = req.body; 
        const userEmail = req.user.email; 

        if (!receivers || !Array.isArray(receivers) || receivers.length === 0) {
            return res.status(400).json({ error: "Receivers are required" });
        }
        if (!subject) {
            return res.status(400).json({ error: "Subject is required" });
        }
        if (!body) {
            return res.status(400).json({ error: "Body is required" });
        }

        const emailData = {
            receivers,
            sender: userEmail,
            subject,
            body,
        };

        const emailId = await emailService.createEmail(emailData);

        res.status(201).json({ success: true, emailId });
    } catch (error) {
        console.error("Error in emailController.createEmail:", error.message);
        res.status(500).json({ error: error.message });
    }
};


exports.updateDraft = async (req, res) => {
    try {
        console.log("Received request to update draft email");

        const emailId = req.params.id; 
        const { receivers, subject, body } = req.body; 

        if (!receivers || !Array.isArray(receivers) || receivers.length === 0) {
            return res.status(400).json({ error: "Receivers are required" });
        }
        if (!subject) {
            return res.status(400).json({ error: "Subject is required" });
        }
        if (!body) {
            return res.status(400).json({ error: "Body is required" });
        }

        const updatedData = {
            receivers,
            subject,
            body,
        };

        const updatedEmail = await emailService.updateDraft(emailId, updatedData);

        res.status(200).json({ success: true, updatedEmail });
    } catch (error) {
        console.error("Error in emailController.updateDraft:", error.message);
        res.status(500).json({ error: error.message });
    }
};
