const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/verificationRepository");

exports.register = async ({ name, email, password }) => {
    console.log("🔹 Registering new user:", { name, email });

    try {
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            console.error("User already exists:", email);
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔹 Password hashed successfully:", hashedPassword);

        const newUser = await userRepository.create({ name, email, password: hashedPassword });
        console.log("User created successfully:", newUser);

        return { _id: newUser._id, name: newUser.name, email: newUser.email };
    } catch (error) {
        console.error("Error in register:", error.message);
        throw error;
    }
};
exports.login = async ({ email, password }) => {
    console.log("🔹 Logging in with email:", email);

    try {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            console.error("User not found:", email);
            throw new Error("Invalid email or password");
        }

      
        console.log("🔹 Comparing passwords...");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error("Password mismatch for:", email);
            throw new Error("Invalid email or password");
        }

        console.log("Password matched successfully");

        
        const token = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        console.log("Token generated:", token);

        return token;
    } catch (error) {
        console.error("Error in login:", error.message);
        throw error;
    }
};
