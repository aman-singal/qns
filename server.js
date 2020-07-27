const express = require('express');
const cors = require('cors');
const {route} = require('./route/route');
const app = express()
const path = require('path')

const PORT = process.env.PORT || 4000

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
app.use('/api' , route);
//Middleware Ends





if (process.env.NODE_ENV === "production") {

  app.use( '/qns' ,express.static("build"));


  app.get("*", (req, res) => {
       res.sendFile(path.resolve(__dirname, "client" ,  "build", "index.html"));
   });

 }

app.listen(PORT , ()=>{
    console.log("Server Up and Running")
})