const mongoose = require("mongoose");

const entrepreneurSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    profileImage: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Entrepreneur",
  entrepreneurSchema
);
