const emailRepository = require("../repositories/emailRepository");



exports.getInboxEmails = async (userEmail) => {
    try {
        return await emailRepository.getInboxEmails(userEmail); 
    } catch (error) {
        console.error("Error in emailService.getInboxEmails:", error.message);
        throw error;
    }
};

exports.getOutboxEmails = async (userEmail) => { 
    try {
        return await emailRepository.getOutboxEmails(userEmail);
    } catch (error) {
        console.error("Error in emailService.getOutboxEmails:", error.message);
        throw error;
    }
};

exports.getDraftEmails = async (userEmail) => { 
    try {
        return await emailRepository.getDraftEmails(userEmail); 
    } catch (error) {
        console.error("Error in emailService.getDraftEmails:", error.message);
        throw error;
    }
};

exports.createEmail = async (emailData) => {
    try {
        console.log("Preparing to create a draft email");

        emailData.status = "draft";

        const emailId = await emailRepository.createEmail(emailData);

        console.log("Draft email created with ID:", emailId);
        return emailId;
    } catch (error) {
        console.error("Error in emailService.createEmail:", error.message);
        throw error;
    }
};
exports.updateDraft = async (emailId, updatedData) => {
    try {
        console.log("Preparing to update draft email");

        
        if (!emailId) {
            throw new Error("Email ID is required");
        }

        const updatedEmail = await emailRepository.updateDraft(emailId, updatedData);

        if (!updatedEmail) {
            throw new Error("Draft email not found or cannot be updated");
        }

        console.log("Draft email updated:", updatedEmail);
        return updatedEmail;
    } catch (error) {
        console.error("Error in emailService.updateDraft:", error.message);
        throw error;
    }
};