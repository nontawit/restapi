const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
    console.error('Error connection to MongoDB:', err);
    throw err;
})
//Middleware
app.use(express.json());

//Routes
const ordersRoute = require(path.join(__dirname, 'routes', 'orders'));
app.use('/orders', ordersRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});