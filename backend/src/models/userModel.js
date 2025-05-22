// aqui está seu "banco" de usuários
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  name: {
    type: String,
    trim: true,
  },

  profilePic: {
    type: String,
    default: "",
  },

  phone: {
    type: String,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
