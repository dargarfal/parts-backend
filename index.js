const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');


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

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public'),
    filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  }
});

app.use(multer({storage}).single('image'));

//Import routers
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/login'));
app.use('/api/brands', require('./routes/brand'));
app.use('/api/locations', require('./routes/location'));
app.use('/api/cars', require('./routes/car'));
app.use('/api/parts', require('./routes/part'));
app.use('/api/sales', require('./routes/sale'));
app.use('/api/images', require('./routes/image'));


//Running server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Running on port '+ PORT));


