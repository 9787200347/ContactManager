const express = require('express');
const errorhandler = require('./middleWare/errorhandler');
const app = express();
const mongoose = require('mongoose');
const condb = require('./config/Databse');
const dotenv = require("dotenv").config();



let port  = process.env.PORT || 5001;


condb();
app.use(express.json());
app.use("/contact",require("./routes/contactRoutes"));
app.use("/userdetails",require("./routes/UserRoutes"));
app.use(errorhandler);

app.listen(port,()=>{
    console.log(`listening on ${port}`);
})