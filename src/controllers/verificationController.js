const authService = require("../services/verificationService");

exports.register = async (req, res) => {
    console.log("Start register:", req.body); // הדפסת פרטי הבקשה
    try {
        const user = await authService.register(req.body);
        console.log("User registered:", user); // הדפסת המשתמש שנרשם
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error in register:", error.message);
        res.status(400).json({ error: error.message });
    }
};


exports.login = async (req, res) => {
    try {
        const token = await authService.login(req.body);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(400).json({ error: error.message });
    }
};
