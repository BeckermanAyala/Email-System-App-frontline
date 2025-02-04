const Email = require("../models/emailModel");

exports.getInboxEmails = async (userEmail) => {
    try {
        console.log(`Fetching inbox emails for userEmail: ${userEmail}`);
        const emails = await Email.find({
            receivers: { $in: [userEmail] },
            status: "inbox"
        });

        console.log("Emails found:", emails);
        return emails;
    } catch (error) {
        console.error("Error in emailRepository.getInboxEmails:", error.message);
        throw error;
    }
};
exports.getOutboxEmails = async (userEmail) => {
    try {
        console.log(`Fetching outbox emails for userEmail: ${userEmail}`);
        const emails = await Email.find({
            receivers: { $in: [userEmail] },
            status: "outbox"
        });

        console.log("Emails found:", emails);
        return emails;
    } catch (error) {
        console.error("Error in emailRepository.getOutboxEmails:", error.message);
        throw error;
    }
};

exports.getDraftEmails = async (userEmail) => {
    try {
        console.log(`Fetching draft emails for userEmail: ${userEmail}`);
        const emails = await Email.find({
            receivers: { $in: [userEmail] },
            status: "draft"
        });

        console.log("Emails found:", emails);
        return emails;
    } catch (error) {
        console.error("Error in emailRepository.getDraftEmails:", error.message);
        throw error;
    }
};


exports.createEmail = async (emailData) => {
    try {
        console.log("Creating a new email:", emailData);

        const newEmail = new Email(emailData);
        const savedEmail = await newEmail.save();

        console.log("Email created successfully:", savedEmail);
        return savedEmail._id; 
    } catch (error) {
        console.error("Error in emailRepository.createEmail:", error.message);
        throw error;
    }
};
exports.updateDraft = async (emailId, updatedData) => {
    try {
        console.log(`Updating draft email with ID: ${emailId}`);

        const updatedEmail = await Email.findOneAndUpdate(
            { _id: emailId, status: "draft" }, 
            { $set: updatedData }, 
            { new: true } 
        );

        if (!updatedEmail) {
            console.log("Draft email not found or cannot be updated");
            return null;
        }

        console.log("Draft email updated successfully:", updatedEmail);
        return updatedEmail;
    } catch (error) {
        console.error("Error in emailRepository.updateDraft:", error.message);
        throw error;
    }
};