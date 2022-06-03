const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(request,respond){
  var fname = request.body.fname;
  var lname = request.body.lname;
  var email = request.body.email;

  var data = {
    members : [
      {
        email_address : email,
        status : "subscribed",
        merge_feilds : {
          FNAME : fname,
          LNAME : lname
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var url = "https://us8.api.mailchimp.com/3.0/lists/8340e16ee4";

  const option = {
    method : "POST",
    auth : "prassanth:deb39f982e20a723ac2b6a3d9ddf6fdb-us8"
  }

  var request = https.request(url,option, function(response){

    var result = response.statusCode;
    console.log(result);

    if (result === 200)
      respond.sendFile(__dirname + "/success.html");
    else
      respond.sendFile(__dirname + "/failure.html");

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  });

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req,res){
  res.sendFile(__dirname + "/signup.html");
  //or res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server running at port 3000");
});

//deb39f982e20a723ac2b6a3d9ddf6fdb-us8
//8340e16ee4
