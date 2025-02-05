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