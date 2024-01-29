const mongoose = require("mongoose");

// Blog Post Schema
const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ 
      text: String, 
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now },
       updatedAt: { type: Date, default: Date.now }
       }],
       createdAt: { type: Date, default: Date.now },
       updatedAt: { type: Date, default: Date.now }
      });

const Post = mongoose.model('Post', postSchema);

module.exports = { Post }