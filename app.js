const { query } = require("express");
const express = require ("express");
const request = require("request");
const https = require("https");


const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/" , function (req , res ){
    
   res.sendFile(__dirname + "/signup.html");
   
});

app.post("/" , function(req , res){

    const firstName = req.body.Fname;
    const lastName = req.body.Lname;
    const email = req.body.Email;
    const data = {
        members: [
            {
                email_address : email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    var jsonDATA = JSON.stringify(data);


    const url = "https://us5.api.mailchimp.com/3.0/lists/4df7cc783d";

    const options = {
        method: "POST",
        auth: "al92kosmas:11c0418a862629dea75262c03169e7ccb-us5"
    }


    const request = https.request(url, options, function (response) {

            if(response.statusCode === 200){       
                    res.sendFile(__dirname + "/success.html");
            }else{
                    res.sendFile(__dirname + "/failure.html");
            }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonDATA);
    request.end();

});

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});


//API key
//1c0418a862629dea75262c03169e7ccb-us5
//ec87cd0ec51fe2943ce52c58d0140e0b-us5

//List ID
//4df7cc783d