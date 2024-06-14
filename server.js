const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

app.use('/orders', orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
