const User = require("../models/User");

exports.findByEmail = async (email) => {
    try {
        console.log("findByEmail - Looking for user:", email);
        
        const user = await User.findOne({ email });

        if (!user) {
            console.log("findByEmail - User not found:", email);
            return null;
        } else {
            console.log("findByEmail - User found:", user);
            return user;
        }
    } catch (error) {
        console.error("findByEmail - Error:", error.message);
        throw error;
    }
};

exports.create = async (userData) => {
    try {
        console.log("create - Creating new user:", userData);

        const newUser = new User(userData);
        const savedUser = await newUser.save();

        console.log("create - User created successfully:", savedUser);
        return savedUser;
    } catch (error) {
        console.error("create - Error:", error.message);
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