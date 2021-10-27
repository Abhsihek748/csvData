# csvData

deploy : https://csvtojsonnodejs.herokuapp.com

in this project i have created a nodejs server which convers some csv data and parse it into Json/object form and gives us relevant data when we query it using get request .

eg : https://csvtojsonnodejs.herokuapp.com/?country=MF


 {"data":{"MF":{"Code":"MF","Name":"Saint Martin","Native":"Saint-Martin","Phone":"590","Continent":"North America","Capital":"Marigot","Currency":"EUR","Languages":[{"code":"en","name":"English"},{"code":"fr","name":"French"},{"code":"nl","name":"Dutch"}]}}}

 just copy the repo and to npm index.js or nodemon then the server will start at port http://localhost:8081 ;

  postman api 👍 // this is a test api http://localhost:8081/?country=MF get request 