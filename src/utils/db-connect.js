const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const DB_URL = process.env.DB_URL;

class DBConnect {
    constructor() {
        this.isConnected = false;
    }

    async init() {
        try {
            if (this.isConnected) {
                console.log("Already connected to MongoDB");
                return;
            }

            console.log(`Connecting to MongoDB at ${DB_URL}...`);
            await mongoose.connect(DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 30000,
                socketTimeoutMS: 60000,
            });

            this.isConnected = true;
            console.log("MongoDB connected successfully");
        } catch (error) {
            console.error("MongoDB Connection Error:", error.message);
            throw error;
        }
    }

    async terminate() {
        try {
            await mongoose.connection.close();
            this.isConnected = false;
            console.log("MongoDB Connection Closed");
        } catch (error) {
            console.error("Error closing MongoDB connection:", error.message);
        }
    }
}

module.exports = new DBConnect();
