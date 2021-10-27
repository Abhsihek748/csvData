const express = require("express");
const app = express();
const csv = require('csv-parser');
const fs = require('fs');
app.use(express.json());

const csvToData = async (data)=>{
   return new Promise((resolve, reject)=>{
  let obj = [];
  fs.createReadStream(data)
  .pipe(csv())
  .on('data', (row) => {
    obj.push(row) ;
  })
  .on('end', () => {
       resolve(obj);
    console.log('CSV file successfully processed');
  });  
})
}

let languages=[],countries=[], continents=[] , counter = 0;

csvToData('countries.csv').then((data) => {
    countries = data;
    counter = counter + 1;
});

csvToData('languages.csv').then((data) => {
    languages = data ;
    counter += 1;
});
csvToData('continents.csv').then((data) => {
    continents = data
    counter += 1;
});

const find = (data, value)=>{
    // console.log(value);
    for(let i in data ){
        if(data[i]["Code"]== value)
        { 
         return data[i];
        }
    }
}

app.get('/',function(req,res){
    let data = {};
 let country = req.query.country ;
 if(country){
 let obj = find(countries, country);
 let language ={};
 let codes = obj["Languages"];
 console.log(codes);
 if(codes.includes(',')){
     language = [];
     codes = codes.split(",") ;
     for(let code of codes){
        let name = find(languages , code)["Name"];   
        let obj = {code , name};
        language.push(obj);
     }
     obj["Languages"] = language ;
 }
 else{
 language["code"] = codes ;
 language["name"] = find(languages , language.code)["Name"];
  obj["Languages"] = language ;
 }

  
  data[country] = obj;
 }
//  console.log(data);
  res.json({"data" :data });
})


app.listen(process.env.PORT||8081, function () {
    console.log("server started");
})