
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const DB_NAME = process.env.DB_NAME; // שם בסיס הנתונים
const DB_URL = process.env.DB_URL;  // כתובת החיבור למסד הנתונים

class DBConnect {
    constructor() {
        // הגדרת MongoClient עם Timeout והגדרות נוספות
        this.dbConn = new MongoClient(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // זמן המתנה לבחירת שרת
            socketTimeoutMS: 45000,        // זמן המתנה לחיבור סוקטים
            tls: true,                     // חיבור מאובטח
            tlsAllowInvalidCertificates: true // מתיר תעודות TLS לא חוקיות (אם נדרש)
        });
    }

    async init() {
        try {
            // התחברות למסד הנתונים
            await this.dbConn.connect();
            console.log("🚀 DB is connected successfully");

            // בדיקת Ping למסד הנתונים
            const admin = this.dbConn.db().admin();
            const pingResult = await admin.ping();
            console.log("✅ Ping result:", pingResult);
        } catch (error) {
            console.error("Error connecting to MongoDB:", error.message);
            throw error;
        }
    }

    // פונקציה לקבלת אובייקט DB
    getDB(dbName = DB_NAME) {
        return this.dbConn.db(dbName);
    }

    // סגירת חיבור למסד הנתונים
    async terminate() {
        try {
            await this.dbConn.close();
            console.log("DB is closed successfully");
        } catch (error) {
            console.error("Error closing the DB connection:", error.message);
        }
    }
}

module.exports = DBConnect;
