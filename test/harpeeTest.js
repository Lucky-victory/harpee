require('dotenv').config();
const harpee = require("../harpee");



harpee.connect({host:process.env.DB_HOST,username:process.env.DB_USER,password:process.env.DB_PASS});
const articleSchema = harpee.Schema({name:"defaultSchema",fields:{
  
}});

const Articles= new harpee.model("Article",articleSchema);

module.exports.Articles = Articles;