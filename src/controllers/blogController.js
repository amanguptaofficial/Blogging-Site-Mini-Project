const Util = require("../utils/Utils")
const responseCode = require("../utils/response-code")
const responseMessage = require("../utils/response-message")
const blogService = require("../services/blogServices");

//-------------------------------------------------------🔥CREATE BLOG SERVICE🔥------------------------------------------------

const createBlog = async function(req,res){
try { 
  const createdBlog = await blogService.createBlogService(req.body);
  res.send(createdBlog);
} catch (error) {
  res.send(Util.response({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}}));
}
}

//-------------------------------------------------------🔥GET ALL BLOGS SERVICE🔥------------------------------------------------

const getAllBlogs = async function(req,res){
   try {
    const fetchedBlogs=  await blogService.getAllBlogsService(req.query);
    res.send(fetchedBlogs);
   } catch (error) {
    res.send(Util.response({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}}));
   }
}

//-------------------------------------------------------🔥UPDATE BLOG SERVICE🔥------------------------------------------------

const updateBlog = async function(req,res){
  try {
    const updatedBlog = await blogService.updateBlogService(req.params,req.body,req.tokenAuthorId);
    res.send(updatedBlog);
  } catch (error) {
    console.log(error.message);
    res.send(Util.response({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}}));
}  
}

//-------------------------------------------------------🔥DELETE BLOG SERVICE🔥------------------------------------------------

const deleteBlog = async function(req,res){
 try {
    const deletedBlog = await blogService.deleteBlogService(req.params,req); 
    res.send(deletedBlog); 
 } catch (error) {
    res.send(Util.response({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}})); 
 }
}

//-------------------------------------------------------🔥DELETE  FILTER BLOG SERVICE🔥------------------------------------------------

const deleteBlogByFilter = async function(req,res){
   try {
   const deltedData= await blogService.deleteBlogWithFilter(req);
   res.send(deltedData);
   } catch (error) {
    res.send(Util.response({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}})); 
   }
}



module.exports={
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog,
  deleteBlogByFilter
    
};