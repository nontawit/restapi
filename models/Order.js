const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    amount: Number,
    date: String,
    status: String
}, { versionKey: false }); // Disable __v

module.exports = mongoose.model('Order', orderSchema);
