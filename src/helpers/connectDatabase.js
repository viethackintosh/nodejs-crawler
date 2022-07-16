import mariadb from 'mariadb';
import dotenv from 'dotenv';
const envConfig = dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,   
    connectionLimit: 5
})
export default pool;
