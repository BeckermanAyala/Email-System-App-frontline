const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    receivers: [{ type: String, required: true }],  
    sender: { type: String, required: true }, 
    date: { type: Date, default: Date.now }, 
    subject: { type: String, required: true },
    body: { type: String, required: true },
    status: { 
        type: String, 
        enum: ["draft", "outbox", "inbox"], 
        required: true 
    }
}, { 
    collection: "Email", 
    timestamps: true 
});

module.exports = mongoose.model("Email", emailSchema);
