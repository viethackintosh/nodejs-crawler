import pool from '../helpers/connectDatabase.js';
import checkCondition from '../helpers/changeCondition.js';
const now = new Date();

const Master = function() {
    let ms = this;
    ms.temp;
    ms.table;
    ms.prefix = process.env.PREFIX;
    ms.count = async (condition) => {
        // đếm số 
        let connection;
        let rows;       
        
        const conditionConvert = checkCondition.select(condition); 
        try {

            connection = await pool.getConnection();
            const sqlQuery = `SELECT COUNT(ID) as count FROM ${ms.prefix}${ms.table} ${conditionConvert.sqlStr}`;
            if (conditionConvert.sqlStr != '') rows = await connection.query(sqlQuery, conditionConvert.condition);
            else rows = await connection.query(sqlQuery);
            connection.end();
            return rows;

        } catch (err) {
            throw err
        }   
    }
    ms.list = async (condition) => { 
        // lấy tất cả các post, hoặc lấy post theo số lượng, trang
        // {} lấy tất        
        // {count:n, page: m, condition: { danh sách lấy theo trường} } lấy số lượng n bài viết, trang m 
        let connection;
        try {
            connection = await pool.getConnection();
            const sqlQuery = `SELECT * FROM ${ms.prefix}${ms.table}`;
            const rows = await connection.query(sqlQuery);
            connection.end();
            return rows;
        } catch (err) {
            throw err 
        }   
    }

    ms.find = async (condition) => { // tìm kiếm post bất kỳ theo các trường có trong table
        
        let connection;
        let rows;
        const conditionConvert = checkCondition.select(condition);
        
        try {
            connection = await pool.getConnection();
            const sqlQuery = `SELECT * FROM ${ms.prefix}${ms.table} ${conditionConvert.sqlStr}`;       
            if (conditionConvert.sqlStr != '') rows = await connection.query(sqlQuery, conditionConvert.condition);
            else rows = await connection.query(sqlQuery);
            connection.end();        
            return rows;
        } catch (err) {
            throw err
        }   
    }

    ms.insert = async (post) => {
        /**
         * post: object, dữ liệu của bài viết theo các trường có trong table
         */
        if ( post === undefined || JSON.stringify(post) === JSON.stringify({})) return -1; // kiểm tra post đúng là object json
        
        let connection;
        let rows;
       
        const conditionConvert = checkCondition.insert(post);
        try {
            connection = await pool.getConnection();            
            
            const sqlQuery = `INSERT INTO ${ms.prefix}${ms.table} 
                            (${conditionConvert.fields}) VALUES 
                            (${conditionConvert.sqlStr})`;       
            const rows = await connection.query(sqlQuery, conditionConvert.values);            
            connection.end();        
            return rows;

        } catch (err) {
            throw err
        }
    }
    ms.update = async ( post ) => {
        /**
         * post: object, chứa dữ liệu cần update
         */

        if ( post === undefined || JSON.stringify(post) === JSON.stringify({})) {
            return -1;
        }        
        let connection;
        let rows;
        let cdn = checkCondition.update(post);
        try {
            connection = await pool.getConnection();            
            
            const sqlQuery = `UPDATE ${ms.prefix}${ms.table} SET ${cdn.updateSQL} WHERE ${cdn.WhereSQL};`;       
            const rows = await connection.query(sqlQuery, (err, result) => {
                if (err) throw err;                
            });            
            connection.end();        
            return rows;

        } catch (err) {
            throw err
        }       
    }
    ms.delete = async (condition) => {
        /**
         * xoá 1 record trong bảng với điều kiện condition là 1 object
         */
        if ( condtion === undefined || JSON.stringify(condtion) === JSON.stringify({})) {
            return -1;
        }   
        let connection;
        let rows;
        let cdn = checkCondition.where(condition);
        try {
            connection = await pool.getConnection();            
            
            const sqlQuery = `DELETE FROM ${ms.prefix}${ms.table} WHERE ${cdn.whereSQL};`;       
            const rows = await connection.query(sqlQuery, (err, result) => {
                if (err) throw err;                
            });            
            connection.end();        
            return rows;

        } catch (err) {
            throw err
        }   

    }
    return ms;
}

export default Master;
