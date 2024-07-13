const Util = require("../utils/Utils");
const responseCode = require("../utils/response-code");
const responseMessage = require("../utils/response-message");
const blog = require("../models/blog");
const moment = require("moment");
const mongoose = require("mongoose");

// ------------------------------------------------🔥Create Blog Service🔥-------------------------------------------

const createBlogService = async function (blogData , tokenAuthorId) {
  try {
    const { title, body, authorId, tags, category, subcategory} = blogData;
    if(authorId != tokenAuthorId) return Util.responseFormat({code:responseCode.NOT_AUTHORIZED,msg:responseMessage[responseCode.NOT_AUTHORIZED],data:{}});
    const createdBlog = await blog.create(blogData);
    return Util.responseFormat({
      code: responseCode.SUCCESS,
      msg: responseMessage[responseCode.SUCCESS],
      data: createdBlog,
    });
  } catch (error) {
    console.log(error.message);
    return Util.responseFormat({
      code: responseCode.INTERNAL_SERVER_ERROR,
      msg: responseMessage[responseCode.INTERNAL_SERVER_ERROR],
    });
  }
};

// ------------------------------------------------🔥get all Blog Service🔥-------------------------------------------
const getAllBlogsService = async function (queryData, tokenAuthorId) {
  try {
    if (Object.keys(queryData).length == 0) {
      const allBlogs = await blog.find({ isDeleted: false, isPublished: true ,authorId: tokenAuthorId});
      if (allBlogs.length == 0)
        return Util.responseFormat({
          code: responseCode.NO_BLOG_FOUND,
          msg: responseMessage[responseCode.NO_BLOG_FOUND],
          data: {},
        });
      return Util.responseFormat({
        code: responseCode.SUCCESS,
        msg: responseMessage[responseCode.SUCCESS],
        data: allBlogs,
      });
    } else {
      const { authorId, category, tags, subcategory } = queryData;
     let query = {};
      if (authorId) {
      if (!mongoose.Types.ObjectId.isValid(authorId))
          return Util.responseFormat({
            code: responseCode.INCORRECT_AUTHOR_ID,
            msg: responseMessage[responseCode.INCORRECT_AUTHOR_ID],
            data: {},
          });
       if(authorId != tokenAuthorId) return Util.responseFormat({code:responseCode.NOT_AUTHORIZED,msg:responseMessage[responseCode.NOT_AUTHORIZED],data:{}});
        else query.authorId = authorId;
      }
      if (category) query.category = category;
      if (tags) query.tags = tags;
      if (subcategory) query.subcategory = subcategory;
      query.isDeleted = false;
      query.isPublished = true; 
      const filteredData = await blog.find(query);
      if (filteredData.length == 0)
        return Util.responseFormat({
          code: responseCode.NO_BLOG_FOUND,
          msg: responseMessage[responseCode.NO_BLOG_FOUND],
          data: {},
        });
      return Util.responseFormat({
        code: responseCode.SUCCESS,
        msg: responseMessage[responseCode.SUCCESS],
        data: filteredData,
      });
    }
  } catch (error) {
    return Util.responseFormat({
      code: responseCode.INTERNAL_SERVER_ERROR,
      msg: responseMessage[responseCode.INTERNAL_SERVER_ERROR],
    });
  }
};

// ------------------------------------------------🔥Update Blog Service🔥-------------------------------------------
const updateBlogService = async function ( requestBlogId, updatedrequestData, tokenAuthorId ) {
  try {
    const { blogId } = requestBlogId;
    const { title, body, tags, subcategory, isPublished } = updatedrequestData;
    if(!mongoose.Types.ObjectId.isValid(blogId)) return Util.response({code:responseCode.INCORRECT_BLOG_ID,msg:responseMessage[responseCode.INCORRECT_BLOG_ID],data:{}});
    const blogData = await blog.findById(blogId);
    if(!blogData) return Util.responseFormat({code:responseCode.NO_BLOG_FOUND,msg:responseMessage[responseCode.NO_BLOG_FOUND],data:{}});
    if(blogData.isDeleted == true) return Util.responseFormat({code:responseCode.NO_BLOG_FOUND,msg:responseMessage[responseCode.NO_BLOG_FOUND],data:{}});   
     console.log(blogData.authorId.toString(),  tokenAuthorId);
    if (tokenAuthorId !== blogData.authorId.toString()) {
      return Util.responseFormat({
        code: responseCode.NOT_AUTHORIZED,
        msg: responseMessage[responseCode.NOT_AUTHORIZED],
        data: {},
      });
    } else {
      if (title) blogData.title = title;
      if (body) blogData.body = body;
      if (tags) {
        for (const tag of tags) {
          blogData.tags.push(tag);
        }
      }
      if (subcategory) {
        for (const category of subcategory) {
          blogData.subcategory.push(category);
        }
      }
      if(isPublished){
        blogData.isPublished = isPublished;
        blogData.publishedAt = moment().format("MMMM Do YYYY, h:mm:ss a");
      }
      const updatedBlogData = await blog.findOneAndUpdate(
        { _id: blogId },
        { $set: blogData },
        { new: true }
      );
      return Util.responseFormat({
        code: responseCode.SUCCESS,
        msg: responseMessage[responseCode.SUCCESS],
        data: updatedBlogData,
      });
    }
  } catch (error) {
    console.log(error.message);
    return Util.responseFormat({
      code: responseCode.INTERNAL_SERVER_ERROR,
      msg: responseMessage[responseCode.INTERNAL_SERVER_ERROR],
    });
  }
};

// ------------------------------------------------🔥Delete Blog Service🔥-------------------------------------------

const deleteBlogService = async function ({ blogId }, req) {
  try {
    const tokenAuthorId = req.tokenAuthorId;
    if (!mongoose.Types.ObjectId.isValid(blogId))
      return Util.responseFormat({
        code: responseCode.INCORRECT_BLOG_ID,
        msg: responseMessage[responseCode.INCORRECT_BLOG_ID],
        data: {},
      });
    const blogData = await blog.findById(blogId);
    if (!blogData)
      return Util.responseFormat({
        code: responseCode.NO_BLOG_FOUND,
        msg: responseMessage[responseCode.NO_BLOG_FOUND],
        data: {},
      });
      console.log(tokenAuthorId , blogData.authorId.toString());
    if (tokenAuthorId !== blogData.authorId.toString()) {
      return Util.responseFormat({
        code: responseCode.NOT_AUTHORIZED,
        msg: responseMessage[responseCode.NOT_AUTHORIZED],
        data: {},
      });
    } else {
      if (blogData.isDeleted == true)
        return Util.responseFormat({
          code: responseCode.NO_BLOG_FOUND,
          msg: responseMessage[responseCode.NO_BLOG_FOUND],
          data: {},
        });
      const updateddata = await blog.findOneAndUpdate(
        { _id: blogId },
        { $set: { isDeleted: true } },
        { new: true }
      );
      return Util.responseFormat({
        code: responseCode.SUCCESS,
        msg: responseMessage[responseCode.SUCCESS],
      });
    }
  } catch (error) {
    return Util.responseFormat({
      code: responseCode.INTERNAL_SERVER_ERROR,
      msg: responseMessage[responseCode.INTERNAL_SERVER_ERROR],
    });
  }
};

// ------------------------------------------------🔥Delete Blog with filter service🔥-------------------------------------------



const deleteBlogWithFilter = async function (req) {
  try {
    const queryData = req.query;
    const tokenAuthorId = req.tokenAuthorId;
    if (Object.keys(queryData).length == 0)
      return Util.responseFormat({
        code: responseCode.Empty_filter_data,
        msg: responseMessage[responseCode.Empty_filter_data],
        data: {},
      });
    const { category, authorId, tags, subcategory, isPublished } = queryData;
    let fliterObject = {};
    if (category) {
      fliterObject.category = category;
    }
    if (authorId) {
      fliterObject.authorId = authorId;
    }else{
      fliterObject.authorId = tokenAuthorId;
    }
    if (tags) {
      fliterObject.tags = tags;
    }
    if (subcategory) {
      fliterObject.subcategory = subcategory;
    }
    if (isPublished) {
      fliterObject.isPublished = isPublished;
    }

    fliterObject.isPublished =true;
   //console.log(tokenAuthorId);
   
   const blogs = await blog.find(fliterObject);
   // console.log(blogs);
    if(blogs.length==0){
     return Util.responseFormat({code:responseCode.NO_BLOG_FOUND,msg:responseMessage[responseCode.NO_BLOG_FOUND],data:{}});
    }
  
    for(let blog of blogs){
      if(blog.authorId.toString() !== tokenAuthorId){
        return Util.responseFormat({code:responseCode.NOT_AUTHORIZED,msg:responseMessage[responseCode.NOT_AUTHORIZED],data:{}});
      }
    }
  const updateResult = await blog.updateMany(fliterObject,{$set:{isDeleted:true}});
return Util.responseFormat({code:responseCode.SUCCESS,msg:responseMessage[responseCode.SUCCESS]})
  } catch (error) {
    console.log(error.message);
    return Util.responseFormat({
      code: responseCode.INTERNAL_SERVER_ERROR,
      msg: responseMessage[responseCode.INTERNAL_SERVER_ERROR],
    });
  }
};

module.exports = {
  createBlogService,
  getAllBlogsService,
  updateBlogService,
  deleteBlogService,
  deleteBlogWithFilter,
};
