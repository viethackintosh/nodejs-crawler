/**
 * RestAPI cho phép lấy dữ liệu từ 1 category của 1 trang bất kỳ
 */
/*import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import crawlerPageSite from '../functions/crawler.js';*/
import Post from '../models/post.model.js';

let post = new Post();
const PostsController = {
   
    insert: (req, res) => {
      
        let insertPost = { ...post.default, ...req.body };
        let {thumbnail, ...writePost} = insertPost;
        let insert = postModal.insert(writePost)
            .then(rows => {
                res.json({
                    result: rows
                }) 
            })
        
    },
   
}

export default PostsController;
