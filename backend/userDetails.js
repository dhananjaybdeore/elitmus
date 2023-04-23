const mongoose = require("mongoose");

//Creating schema
const UserDetailsScehma = new mongoose.Schema({
  fname: {
    type: String,
    trim: true,
    required: true,
  },

  lname: {
    type: String,
    trim: true,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true,
  },

  password: {
    type: String,
    trim: true,
    required: true,
  },

  userType: {
    type: String,
    trim: true,
    required: true,
  },
  progress: {
    type: [Boolean],
    default: [false, false, false, false, false],
  },
  noOfStageCompleted: {
    type: Number,
    default: 0,
  },
  lastLogin: {
    type: Number,
    default: null,
  },
  clue1CompTime: {
    type: Number,
    default: null,
  },
  clue2CompTime: {
    type: Number,
    default: null,
  },
  clue3CompTime: {
    type: Number,
    default: null,
  },
  clue4CompTime: {
    type: Number,
    default: null,
  },
  clue5CompTime: {
    type: Number,
    default: null,
  },
  totalTime: {
    type: Number,
    default: null,
  },
});

//creating model
const User = mongoose.model("User", UserDetailsScehma);

//exporting model
module.exports = User;
