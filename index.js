const express = require('express');
const morgan = require('morgan');

//Connect to DB
const connectDB = require('./config/db');

//Setting environment variables
require('dotenv').config({path: '.env'});
const cors = require('cors');

//Creating server -------------------------------------
const app = express();

//Enabling json
app.use(express.json({ extended:true }));
app.use(express.urlencoded({extended:false}));

connectDB();
app.use(cors());
app.use(morgan('dev'));

//Import routers
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/login'));
app.use('/api/brands', require('./routes/brand'));
app.use('/api/locations', require('./routes/location'));

//Running server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Running on port '+ PORT));


