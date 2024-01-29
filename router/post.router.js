// postRoutes.js
const express = require('express');

const { getAllPosts, createPost, updatePost, deletePost} = require('../controller/post.controller');

const { verifyAccessToken } = require('../middlewares/usermiddleware');

const postRouter = express.Router();


// POST /posts
postRouter.get('/', getAllPosts);

postRouter.post('/', /*verifyAccessToken*/ createPost);

postRouter.put('/update/:_id', /*verifyAccessToken,*/ updatePost);
postRouter.delete('/delete/:_id', /*verifyAccessToken,*/ deletePost);


module.exports = postRouter;
