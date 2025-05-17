const mongoose = require("mongoose");

const HRSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "email should be unquie"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const HR = mongoose.model("HR", HRSchema);

module.exports = HR;
