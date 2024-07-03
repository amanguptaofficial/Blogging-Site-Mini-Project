const Util = require("../utils/Utils")
const responseCode = require("../utils/response-code")
const responseMessage = require("../utils/response-message")
const blog = require("../models/blog");
const moment = require("moment");
const mongoose = require("mongoose");

const createBlogService = async function(blogData){
    try {
      const {title,body,authorId, tags,category,subcategory,isPublished}= blogData; 
       blogData.publishedAt =moment().format('MMMM Do YYYY, h:mm:ss a');
     const createdBlog =  await blog.create(blogData);
       return Util.responseFormat({code:responseCode.SUCCESS,msg:responseMessage[responseCode.SUCCESS],data:createdBlog});
    } catch (error) {
        console.log(error.message);
      return Util.responseFormat({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR]});
    }
}



const getAllBlogsService = async function(queryData){
   try {
      if(Object.keys(queryData).length==0){
     const allBlogs = await blog.find({isDeleted:false,isPublished:true});
      if(allBlogs.length==0) return Util.responseFormat({code:responseCode.NO_BLOG_FOUND,msg:responseMessage[responseCode.NO_BLOG_FOUND],data:{} })
     return Util.responseFormat({code:responseCode.SUCCESS,msg:responseMessage[responseCode.SUCCESS],data:allBlogs});
     }else{
     const {authorId,category,tags,subcategory}= queryData;
    let query ={};
    if(authorId){
        if(!mongoose.Types.ObjectId.isValid(authorId)) return Util.responseFormat({code:responseCode.INCORRECT_AUTHOR_ID,msg:responseMessage[responseCode.INCORRECT_AUTHOR_ID],data:{}})
        else query.authorId = authorId;
      }
      if(category) query.category = category;
      if(tags) query.tags = tags;
      if(subcategory) query.subcategory = subcategory
      query.isDeleted=false;
      query.isPublished=true;
      console.log(query);
      const filteredData = await blog.find(query);
      if(filteredData.length==0) return Util.responseFormat({code:responseCode.NO_BLOG_FOUND,msg:responseMessage[responseCode.NO_BLOG_FOUND],data:{}});
      return Util.responseFormat({code:responseCode.SUCCESS,msg:responseMessage[responseCode.SUCCESS],data:filteredData}); 
      }
   } catch (error) {
    return Util.responseFormat({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR]});
   }
}

const updateBlogService = async function(requestId ,requestData){
 try {
    const {blogId} = requestId;
    const{title,body,tags,subcategory}= requestData;
   const blogData = await blog.findById(blogId);
   if(title) blogData.title=title;
   if(body) blogData.body=body;
   if(tags){
    for(const tag of tags){blogData.tags.push(tag)}
   } 
   if(subcategory){
     for(const category of subcategory){ blogData.subcategory.push(category)}
   }
   const updatedBlogData = await  blog.findOneAndUpdate({_id:blogId},{$set:blogData},{new:true})
   console.log(updatedBlogData);
   return Util.responseFormat({code:responseCode.SUCCESS,msg:responseMessage[responseCode.SUCCESS],data:updatedBlogData});
 } catch (error) {
  console.log(error.message);
  return Util.responseFormat({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR]});
 }
}

const deleteBlogService = async function({blogId}){
try {
  if(!mongoose.Types.ObjectId.isValid(blogId)) return Util.responseFormat({code:responseCode.INCORRECT_BLOG_ID,msg:responseMessage[responseCode.INCORRECT_BLOG_ID],data:{}}) 
   const blogData = await blog.findById(blogId);
  if(!blogData) return Util.responseFormat({code:responseCode.NO_BLOG_FOUND,msg:responseMessage[responseCode.NO_BLOG_FOUND],data:{}});
  if(blogData.isDeleted==true) return Util.responseFormat({code:responseCode.NO_BLOG_FOUND,msg:responseMessage[responseCode.NO_BLOG_FOUND],data:{}});
  const updateddata = await blog.findOneAndUpdate({_id:blogId},{$set:{isDeleted:true}},{new:true});
  return Util.responseFormat({code:responseCode.SUCCESS,msg:responseMessage[responseCode.SUCCESS]});
  } catch (error) {
   return Util.responseFormat({code:responseCode.INTERNAL_SERVER_ERROR,msg:responseMessage[responseCode.INTERNAL_SERVER_ERROR]});
  }
}

const deleteBlogWithFilter =async function(){
  
}

module.exports={
   createBlogService,
   getAllBlogsService,
   updateBlogService,
   deleteBlogService
   
}