const express = require('express');
const { commentPost, getCommentsByPost, deleteComment} = require('../controller/comment.controller');
const { verifyAccessToken } = require('../middlewares/usermiddleware');
const commentRouter = express.Router();

commentRouter.get('/', getCommentsByPost);
commentRouter.post('/:postId/comments', verifyAccessToken, commentPost);
commentRouter.delete('/:commentId/comment', verifyAccessToken, deleteComment);

module.exports = commentRouter;