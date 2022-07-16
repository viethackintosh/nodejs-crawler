import express from 'express';
import crawler from '../controllers/crawler.controller.js';

const route = express.Router();

route.post('/post/insert',crawler.postInsert);
route.post('/post',crawler.post);
route.post('/cat',crawler.getCatagory);


export default route;
