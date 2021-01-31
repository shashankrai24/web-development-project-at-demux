const express= require('express')
const request=require('request')
//Syntax of express
const app= express()
//Ignore rn
//Middlewares
/*
    Ask express.js to look for a folder called views
*/
app.set("view engine", "ejs") //interviewer kyo kya batana hai view engine ke bare mein ayr terminal mein yeh kya aa raha hai aur console.log nahi ho raha hai
const dotenv=require('dotenv')
dotenv.config()

app.get("/", (req, res)=>{
    res.render("homepage")
})


app.get("/result", (req, res)=>{
    
    const url= `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.moviename}`
    request(url, function (error, response, body){
        if(!error && response.statusCode==200){
            //Parsing JSON into JS object
            const data= JSON.parse(body)
            console.log(data)
            //res.send(data)
           res.render("moviepage", {movie: data})
        }else{
            res.send("Uh oh error")
        }
    })
})
app.get("/result/:id", (req, res)=>{        //yeha pey result/:id kyo hi ki result/name kyo nahi
    const url= `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url, function (error, response, body){
        if(!error && response.statusCode==200){
            //Parsing JSON into JS object
            const data= JSON.parse(body)
            console.log(data)
            //res.send(data)
            res.render("name", {movie: data})
        }else{
            res.send("Uh oh error")
        }
    })
})
app.get("/aboutme", (req, res)=>{
    res.render("aboutme")
})
app.get("/myproject", (req, res)=>{
    res.render("myproject")
})

app.get("*", (req, res)=>{
  // console.log(req)
    res.send("Go back! Illegal response")
})
//e are creating
app.listen(process.env.PORT, ()=>{
    console.log("Server has started")
})