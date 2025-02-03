const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

// const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
// const DB_USER = process.env.DB_USER;
// const DB_CLUSTER = process.env.DB_CLUSTER;

const DB_URL = process.env.DB_URL;

class DBConnect {
    constructor() {
        this.dbConn = new MongoClient(DB_URL);
    }

    async init() {
        await this.dbConn.connect();
        console.log("DB is connected");
    }

    getDB(dbName = DB_NAME) {
        return this.dbConn.db(dbName);
    }

    async terminate() {
        await this.dbConn.close();
        console.log("DB is closed");
    }
}

module.exports = DBConnect;
