const express = require('express');

//Connect to DB
const connectDB = require('./config/db');

//Setting environment variables
require('dotenv').config({path: '.env'});

//Creating server
const app = express();

connectDB();

//Enabling json
app.use(express.json({ extended:true }));

//Running server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Running on port '+ PORT));


