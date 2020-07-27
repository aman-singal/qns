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



// app.get('/'  , (req,res)=>{
//     res.send('<h1> ERROR 404 </h1>')
// })



app.use(express.static('client/build'));

app.listen(PORT , ()=>{
    console.log("Server Up and Running")
})