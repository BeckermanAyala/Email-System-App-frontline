const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const DBConnect = require("./src/utils/db-connect");
const authRoutes = require("./src/routes/verificationRoutes"); // נתיבים של הרשאה

// טוען את משתני הסביבה מקובץ .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // מאפשר תקשורת בין דומיינים שונים (CORS)
app.use(express.json()); // מאפשר קבלת נתונים בפורמט JSON

// אתחול החיבור למסד הנתונים
const db = new DBConnect();
db.init();

// Routes - הגדרת נתיבים
app.use("/api/auth", authRoutes); // כל הנתיבים שקשורים להרשאה יהיו תחת /api/auth

// הפעלת השרת
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
