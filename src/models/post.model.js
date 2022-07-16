/**
 * lấy, tìm kiếm, tạo mới, cập nhật, xoá các dữ liệu về posts bao gồm cà page, và post
 */

import Master from './master.model.js';
const now = new Date();

const Post = function(){
    let pm = new Master();
    pm.table = 'posts';
    pm.default = {           
        post_date: now,
        post_date_gmt: now,     
        post_status: "publish",
        comment_status: "close",
        ping_status: "open",
        post_password: "",       
        to_ping: "",
        pinged: "",      
        post_content_filtered: "", 
        post_parent: 0,       
        menu_order: 0,       
        post_mime_type: "",
        post_modified: now,
        post_modified_gmt: now,
 
    }
   
    return pm;
}
export default Post;
