const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
<<<<<<< HEAD
    match: /@admins\.gourmetslice\.in$/,
=======
    match: /@admins\.gourmetslice\.in$/, // Ensure the email matches the domain
>>>>>>> origin/main
  },
  password: {
    type: String,
    required: true,
  },
});

<<<<<<< HEAD
=======
// Hash password before saving the admin document
>>>>>>> origin/main
adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Create the Admin model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
