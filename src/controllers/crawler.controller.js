/**
 * RestAPI cho phép lấy dữ liệu từ 1 category của 1 trang bất kỳ
 */
import Post from '../models/post.model.js';
import PostMeta from '../models/postmeta.model.js';
import { curly } from 'node-libcurl';

const CrawlerController = {
  
    post: async (req, res) => {   
        const {url } = req.body; 
        const { statusCode, data, headers } = await curly.get(`${url}`);
        res.json({pageContent:data});
    }, 
    postInsert: async (req, res) => {        
        let { post, images, ...meta} = {...req.body};
        //let { } = postMeta;        
        
        // tách post và postMeta 
        // phần post
        // kiểm tra orgiID trong post meta
        // orgiID = tồn tại thì đọc postid, update dữ liệu
        // chưa tồn tại thì thêm mới post lấy insertID 

        // phần post meta
        // nếu post được tạo mới => insert 
        res.json({post, images, meta});
    },
    getCatagory: async (req,res) => {
        const {site, link } = req.body;
        const { statusCode, data, headers } = await curly.get(`${site}${link}`);
        res.json({content:data});
        
    }

}

export default CrawlerController;
