const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const adminUser = {
  email: "admin@example.com",
  passwordHash: bcrypt.hashSync("admin123", 10)
};

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email !== adminUser.email) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, adminUser.passwordHash);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { role: "admin", email },
    "SECRET_KEY",
    { expiresIn: "1h" }
  );

  res.json({
    message: "Admin login successful",
    token
  });
});

module.exports = router;
