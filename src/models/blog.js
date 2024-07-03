const { string } = require("joi");
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  subcategory: [
    {
      type: String,
    },
  ],
  deletedAt: {
    type: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type:String,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});

const Blog = mongoose.model("Blog", blogSchema, "Blog");

module.exports = Blog;
