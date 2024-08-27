const express = require('express');

const app = express();

const  mongoose = require('mongoose');

const condb =async()=>{
    try
    {
      const db = await mongoose.connect('mongodb://127.0.0.1:27017/Contactmanager')
       console.log("Mongoose Connect successflly");
    } 
    catch(err)
     {
        console.log(`Error on connecting to MongoDB: ${err}`)
    };
}

module.exports= condb;