
const mongoose = require("mongoose");
const User = require("../models/User");
const DBConnect = require("../utils/db-connect");

const dbInstance = new DBConnect();

exports.findByEmail = async (email) => {
    try {
        console.log("🔍 findByEmail - Looking for user:", email);
        
        // וידוא חיבור למסד הנתונים
        const db = dbInstance.getDB();
        console.log("✅ findByEmail - Connected to DB");

        // גישה לאוסף ה-Users
        const usersCollection = db.collection("users");
        if (!usersCollection) {
            throw new Error("findByEmail - Users collection not found!");
        }

        // חיפוש המשתמש באוסף
        const user = await usersCollection.findOne({ email });
        
        if (!user) {
            console.log("findByEmail - User not found:", email);
        } else {
            console.log("findByEmail - User found:", user);
        }

        return user;
    } catch (error) {
        console.error("findByEmail - Error:", error.message);
        throw error;
    }
};

exports.create = async (userData) => {
    try {
        console.log("create - Creating new user:", userData);

        // וידוא חיבור למסד הנתונים
        const db = dbInstance.getDB();
        console.log("create - Connected to DB");

        // גישה לאוסף ה-Users
        const usersCollection = db.collection("users");
        if (!usersCollection) {
            throw new Error("create - Users collection not found!");
        }

        // הכנסת המשתמש למסד הנתונים
        const result = await usersCollection.insertOne(userData);

        console.log("create - User created successfully:", result);
        return result;
    } catch (error) {
        console.error("create - Error:", error.message);
        throw error;
    }
};

