const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const DBConnect = require("./src/utils/db-connect");
const authRoutes = require("./src/routes/verificationRoutes"); 
const emailRoutes = require("./src/routes/emailRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

(async () => {
    try {
        await DBConnect.init(); 
        console.log("Database initialized");
        
        // Routes
        app.use("/api/auth", authRoutes);
        app.use("/api/emails", emailRoutes);

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("Failed to start server:", error.message);
    }
})();
