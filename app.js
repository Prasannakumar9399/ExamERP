require('./config/config');
require('./models/db');
require('./config/passport.config');
const express = require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');

const rtsIndex=require('./routes/index.route');

var app=express();

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
//now the url for register is "/api/register"
app.use("/api",rtsIndex);

//start server
app.listen(process.env.PORT,()=>{console.log("Server started at port")})