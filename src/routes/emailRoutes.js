const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/inbox", authMiddleware, emailController.getInboxEmails);
router.get("/outbox", authMiddleware, emailController.getOutboxEmails);
router.get("/draft", authMiddleware, emailController.getDraftEmails);
router.post("/create", authMiddleware, emailController.createEmail);
router.put("/draft/:id", authMiddleware, emailController.updateDraft);


module.exports = router;
