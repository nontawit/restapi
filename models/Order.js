const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    cusName: {
        type: String,
        required: true
    },
    cusAddress: {
        type: String,
        required: true
    },
    cusPhone: {
        type: String,
        required: true
    },
    orderUnit: {
        type: Number,
        required: true
    },
    dateDelivery: {
        type: Date,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
});

const Order = mongoose.model('Order',orderSchema)
module.exports = Order;