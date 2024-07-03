const Util = require("../utils/Utils")
const responseCode = require("../utils/response-code")
const responseMessage = require("../utils/response-message")
const blogService = require("../services/blogServices");

const createBlog = async function(req,res){
try { 
    const createdBlog = await blogService.createBlogService(req.body);
    res.send(createdBlog);
} catch (error) {
    res.send(Util.response({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}}));
}
}



const getAllBlogs = async function(req,res){
   try {
     const fetchedBlogs=  await blogService.getAllBlogsService(req.query);
     res.send(fetchedBlogs);
   } catch (error) {
    res.send(Util.response({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}}));
   }
}

const updateBlog =async function(req,res){
  try {
    const updatedBlog = await blogService.updateBlogService(req.params,req.body);
    res.send(updatedBlog);
  } catch (error) {
    console.log(error.message);
    res.send(Util.response({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}}));
}  
}

const deleteBlog = async function(req,res){
 try {
    const deletedBlog = await blogService.deleteBlogService(req.params); 
    res.send(deletedBlog); 
 } catch (error) {
    res.send(Util.response({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}})); 
 }
}

const deleteBlogByFilter = async function(req,res){
   try {
        await blogService.deleteBlogWithFilter()
   } catch (error) {
    res.send(Util.response({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR],data:{}})); 
   }
}



module.exports={
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog
    
};