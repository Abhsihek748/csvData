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
console.log(obj);
 let language = {};
 language.code = obj["Languages"].split(",")[0] ;
 console.log(language.code);
 language.name = find(languages , language.code)["Name"];
  obj["Languages"] = language ;

  
  data[country] = obj;
 }

  res.json({"data" :data });
})


app.listen(process.env.PORT||8081, function () {
    console.log("server started");
})