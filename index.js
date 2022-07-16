
import express from 'express';
import dotenv from 'dotenv';
import pool from './src/helpers/connectDatabase.js';
import routes from './src/routes/index.js';


 
const envConfig = dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

BigInt.prototype.toJSON = function() {
  return this.toString();
} 

// định nghĩa các tuyến đường
routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})  
