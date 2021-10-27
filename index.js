const express = require("express"); // to start the server
const app = express();
const csv = require('csv-parser'); // parse the csv file
const fs = require('fs');
app.use(express.json());

const csvToData = async (data)=>{          // read the csv file and parse it
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

// reading all the acailable csv files from system

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

const find = (data, value)=>{      // helps to find the value in the data where some object of data have code == value and returns the object
    // console.log(value);
    for(let i in data ){
        if(data[i]["Code"]== value)
        { 
         return data[i];
        }
    }
}

app.get('/',function(req,res){    // route
    let data = {};
 let country = req.query.country ;        // reading the query
 if(country){
 let obj = find(countries, country); // finding the country object
 let language ={}; 
 let codes = obj["Languages"];
 console.log(codes);                   // check if one or more languages
 if(codes.includes(',')){                      // run for more than 1 language
     language = [];
     codes = codes.split(",") ;
     for(let code of codes){
        let name = find(languages , code)["Name"];    // find the name of language from its code
        let obj = {code , name};
        language.push(obj);
     }
     obj["Languages"] = language ;
 }
 else{                                 // run for 1 language
 language["code"] = codes ;
 language["name"] = find(languages , language.code)["Name"]; // find the name of language from its code
  obj["Languages"] = language ;
 }

  
  data[country] = obj;     
 }
//  console.log(data);
  res.json({"data" :data });   //  sends the parsed data
})


app.listen(process.env.PORT||8081, function () {      //  server listening
    console.log("server started");
})