const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    enum: ["Mr", "Mrs", "Miss"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Author = mongoose.model("Author", AuthorSchema, "Author");

module.exports = Author;
