const {Comment} = require('../model/comment.model');
const { Post} = require('../model/post.model')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function commentPost(req, res){
    try {
      const { text } = req.body;
      const { postId } = req.params;
  
      const post = await Post.findById(postId);
      console.log(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      post.comments.push({ text, author: req.userId });
      await post.save();
  
      res.json({ message: 'Comment added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error adding comment' });
    }
  };


  async function getCommentsByPost(req, res) {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId }).populate('author', 'username');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving comments' });
    }
};

async function deleteComment(ras, res) {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.author.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this comment' });
        }

        await comment.remove();
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment' });
    }
};

  module.exports = { 
    commentPost,
    getCommentsByPost, 
    deleteComment
}