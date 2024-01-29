const {Post} = require('../model/post.model')
const verifyAccessToken = require('../middlewares/usermiddleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Create post
async function createPost(req, res) {
    try {
      const { title, body, userId } = req.body;
      
      const newPost = new Post({ 
        title,
        body,
        author: userId
      });
  
      await newPost.save();
    
      res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error creating post' });
    }
  }
  
// Get All Blog Posts
 async function getAllPosts(req, res){
    try {
      const posts = await Post.find().populate('author', 'username').populate('comments.author', 'username');
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving posts' });
    }
  };


  async function updatePost (req, res) {
    try {
      const { _id } = req.params;
      const {userId, title, body} = req.body;
        const post = await Post.findOne({ _id, author: userId });
        if (!post) {
            return res.status(404).json({ message: 'Post not found or user not authorized' });
        }
  
        post.title = title
        post.body = body;
        post.updatedAt = new Date();
        await post.save();
  
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error updating the post' });
    }
  };


  async function deletePost(req, res) {
    try {
        const { _id } = req.params;
        const {userId} = req.body;  // Assuming userId is available in the request headers or authentication

        const post = await Post.findOneAndDelete({ _id, author: userId });

        if (!post) {
            return res.status(404).json({ message: 'Post not found or user not authorized' });
        }

        return res.status(204).json({ message: 'Post successfully deleted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting the post' });
    }
}

  
  


  module.exports = {
    createPost,
    getAllPosts,
    updatePost,
    deletePost 
   };


  
  
  