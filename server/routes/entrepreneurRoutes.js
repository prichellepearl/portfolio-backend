const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const Entrepreneur = require("../models/Entrepreneur");

router.post("/create", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required"
      });
    }

    const entrepreneur = new Entrepreneur({
      name,
      email
    });

    await entrepreneur.save();

    res.status(201).json({
      message: "Entrepreneur created successfully",
      entrepreneur
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create entrepreneur",
      error: error.message
    });
  }
});

router.post(
  "/upload/:id",
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const entrepreneur = await Entrepreneur.findById(req.params.id);

      if (!entrepreneur) {
        return res.status(404).json({
          message: "Entrepreneur not found"
        });
      }

      entrepreneur.profileImage = req.file.path;
      await entrepreneur.save();

      res.status(200).json({
        message: "Profile image uploaded successfully",
        image: req.file.path
      });
    } catch (error) {
      res.status(500).json({
        message: "Upload failed",
        error: error.message
      });
    }
  }
);

module.exports = router;
