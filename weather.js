const express = require("express")
const app = express()
// requiring https module
const https= require("https")

const bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended:true}));

// add css file
app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res){
res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req, res){
  // console.log(req.body.cityName);



    const query=req.body.cityName;
    const apiKey="07edf5dad8ce90aca000dbe229198dfe"
    const unit="metric"

    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit
    // create https reques to URL
    https.get(url,function(response){
      console.log(response.statusCode);



      // checking the response ie data we are getting from the get request made


      response.on("data",function(data){
    // this will give hexa decimal output so we now to parse with Json to string
        // console.log(data);
      const  WeatherData =JSON.parse(data);
        // console.log(WeatherData);
        const temp =WeatherData.main.temp
        const WeatherDescription= WeatherData.weather[0].description
        const icon= WeatherData.weather[0].icon
        const imageUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png"

        // console.log(temp + WeatherDescription);

        res.write("<p> the weather is currently "+WeatherDescription +"</p>");
        res.write("<h1>the temperature in "+req.body.cityName+" is "+temp+" degree celsius</h1>");
        res.write("<img src="+imageUrl+">");
        res.send()


})

})


  // res.send("hello world");
});





app.listen(3000,function(req,res){
  console.log("Server started on port 3000");
});
