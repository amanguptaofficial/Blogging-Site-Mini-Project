const express = require("express");
const { validateAuthor } = require("../validations/createAuthorValidation");
const {validateBlog}= require("../validations/createBlogValidation");
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController");
const {checkBlogIdExits} = require("../validations/updateBlogValidation");
const {loginValidation}= require("../validations/authorLogin");
const {checkAuthentication,checkAuthrization}= require("../middleware/auth");

//-----------------------------------------------🔥All routes🔥--------------------------------------------------------------

router.post("/authors",validateAuthor, authorController.createAuthor);
router.post("/blogs",checkAuthentication,validateBlog,blogController.createBlog);
router.get("/blogs",checkAuthentication,blogController.getAllBlogs);
router.put("/blogs/:blogId",checkAuthentication,checkBlogIdExits, blogController.updateBlog);
router.delete("/blogs/:blogId",checkAuthentication,blogController.deleteBlog);
router.delete("/blogs",checkAuthentication,blogController.deleteBlogByFilter);
router.post("/login", loginValidation, authorController.authorLogin);



module.exports = router;