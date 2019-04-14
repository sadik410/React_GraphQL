const express= require('express');
const mongoose=require('mongoose');
require('dotenv').config({path:'variables.env'});
const Recipe=require('./models/Recipe')
const User=require('./models/User')

//connects to database
mongoose
.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('DB connected')
})
.catch(err=>console.log(err))


//Initializes application
const app=express();


const PORT=process.env.PORT||4444;


app.listen(PORT,()=>{
    console.log(`
    serveur listening on PORT ${PORT}`)
})