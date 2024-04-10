const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    orderQuantity: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Pending'
    },
});

module.exports = mongoose.model('Order', orderSchema);