const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/verificationRepository");

exports.register = async ({ name, email, password }) => {
    console.log("authService - Start register with:", { name, email }); // לוג התחלת רישום
    try {
        // בודק אם המשתמש כבר קיים
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            console.error("authService - User already exists with email:", email);
            throw new Error("User already exists");
        }

        // מצפין את הסיסמה
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("authService - Password hashed successfully");

        // יוצר את המשתמש ושומר אותו במסד הנתונים
        const newUser = await userRepository.create({
            name,
            email,
            password: hashedPassword
        });
        console.log("authService - User created successfully:", newUser);

        // מחזיר את המשתמש החדש (ללא הסיסמה)
        return { _id: newUser._id, name: newUser.name, email: newUser.email };
    } catch (error) {
        console.error("authService - Error in register:", error.message);
        throw error;
    }
};

exports.login = async ({ email, password }) => {
    console.log("authService - Start login with email:", email); // לוג התחלת התחברות
    try {
        // מחפש את המשתמש לפי אימייל
        const user = await userRepository.findByEmail(email);
        if (!user) {
            console.error("authService - User not found with email:", email);
            throw new Error("Invalid email or password");
        }

        // בודק אם הסיסמה תואמת לסיסמה המוצפנת
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error("authService - Password mismatch for email:", email);
            throw new Error("Invalid email or password");
        }
        console.log("authService - Password matched successfully");

        // יוצר טוקן JWT עבור המשתמש
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // תוקף הטוקן הוא שעה
        );
        console.log("authService - Token generated successfully");

        // מחזיר את הטוקן
        return token;
    } catch (error) {
        console.error("authService - Error in login:", error.message);
        throw error;
    }
};
