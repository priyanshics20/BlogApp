const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors'); 
const dotenv = require('dotenv');
const connectDB = require('./config/db');

//env config 
dotenv.config();

// router import
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
// mongodb connection 
connectDB();

// rest object
const app = express();

// middlewares 
app.use(cors()); // to accept any url(for frontend and backend)  
app.use(morgan('dev')); // to see in console (any url which will hit)
app.use(express.json()); // to accept json data


//routes 
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog', blogRoutes)

//port 
const PORT = process.env.PORT || 8080;
// listen port
app.listen(PORT, () => {
    console.log(`Server running on ${process.env.DEV_MODE} mode port ${PORT}`.bgCyan.white);
})