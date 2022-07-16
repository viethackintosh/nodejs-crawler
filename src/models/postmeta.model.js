import Master from './master.model.js';

const PostMeta = function() {
    let pstm = new Master();
    pstm.table = 'postmeta';

    return pstm;
}

export default PostMeta;
