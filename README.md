# Blog Platform API

## Description

This project is a backend implementation of a blog platform. It features user authentication, *CRUD* operations for blog posts, and the ability to add comments to posts. The API is built using Node.js with Express and uses MongoDB as the database.

## Features

- User Authentication (Register, Login, Logout)
- CRUD operations for blog posts
- Ability to comment on blog posts
- JWT-based authentication for protected routes

## Installation
## 🚀 Quick start
1. Clone the repository:
   ```bash
   git clone [repository-url]
2. Navigate to the project directory 
    cd [blog_platform]
    3. Run `npm install` in your terminal to install all dependencies from npm.
4. Set up a MongoDB database and add URI to `.env` file as `DATABASE_URL=your_database_uri`.
5. Start the server by running `nodemon index.js` or `npm start`.

6. Open http://localhost:8080/ in your web browser to access the application.   
API Endpoints

7. Authentication
.GET /user/protected-route: verify Access Token
.POST /user/login: Login a user
.POST /user/register: register a user
.POST /user/logout: Logout a user
.PUT /user/:userId: update a user
.POST /user/protected-route: verify Refresh Token

8. Blog Posts
.GET /post: Get all blog posts
.POST /post: Create a new blog post (protected)
.PUT /post/update/:id: Update a blog post (protected)
.DELETE post/delete/:id: Delete a blog post (protected)


9. Comments
.POST /comment/:postId/comments: Add a comment to a post (protected)
.GET /comment: Get comments for a post
.DELETE /comment/:commentId/comment: Delete a comment (protected)


##Contributors
[Tatev]