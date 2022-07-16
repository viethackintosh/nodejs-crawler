import express from 'express';
import postsController from '../controllers/posts.controller.js';

const route = express.Router();

route.post('/insert',postsController.insert);
//route.get('/count',postsController.getPost)
//route.post('/posts',postsController.posts)

//route.get('/',postsController.getPosts)
//route.post('/',postsController.post)

export default route;
