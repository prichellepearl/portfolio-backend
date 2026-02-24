const express = require("express");
const router = express.Router();

const sendEmail = require("../utils/sendEmail");
const Contact = require("../models/Contact"); 
const validate = require("../middleware/validate");
const contactSchema = require("../validation/contactSchema");

router.post("/", validate(contactSchema), async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();
    await sendEmail({ name, email, message });

    res.status(201).json({
      status: "success",
      message: "Message saved successfully",
      data: newContact
    });
  } catch (error) {
    console.error("Contact save error:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to save contact message"
    });
  }
});

module.exports = router;
