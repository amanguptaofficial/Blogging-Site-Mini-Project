const express = require("express");
const { validateAuthor } = require("../validations/createAuthorValidation");
const {validateBlog}= require("../validations/createBlogValidation");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");
const {checkBlogIdExits} = require("../validations/updateBlogValidation");


router.post("/authors",validateAuthor, authorController.createAuthor);
router.post("/blogs",validateBlog,blogController.createBlog);
router.get("/blogs",blogController.getAllBlogs);
router.put("/blogs/:blogId",checkBlogIdExits, blogController.updateBlog);
router.delete("/blogs/:blogId",blogController.deleteBlog);
//router.delete("/blogs",blogController)

module.exports = router;