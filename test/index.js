require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const harpee = require('../harpee');
const { Articles } = require('./harpeeTest');


app.get('/', async (req, res) => {


  let d = await Articles.find([], (err, data) => {
    if (err) console.log(err);
    console.log(data)
  }).catch(err => console.log(err));
  //await Articles.importFromCsvUrl({fileUrl:'https://s3.amazonaws.com/complimentarydata/breeds.csv'},(err,data)=>{
  //if(err) console.log(err)
  //console.log(data)
  //})
  //await Articles.clearAll()
  res.send("hello world")
});

app.listen(port, () => {
  console.log("listening on " + port)
})