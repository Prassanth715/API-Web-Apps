const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const city = req.body.cityName;
  const id = "fb5b85b7aa8fcd85b7346dfee8112286";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid="+ id + "&units=" + unit;

  https.get(url,function(response){

    console.log(response.statusCode);

    response.on("data", function(data){

      var weatherData = JSON.parse(data);
      var temp = weatherData.main.temp;
      var desc = weatherData.weather[0].description;
      var icon = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<h1>Simple Weather App</h1>");
      res.write("<h2>City : " + city + "</h2>");
      res.write("<h2>Temperature : "  + temp + " C</h2>");
      res.write("<h2>Weather Description : " + desc + "</h2>");
      res.write("<img src = " + iconURL + ">");
      res.send();

});
});
});

app.listen(3000, function(){
  console.log("Server running on port 3000");
});
