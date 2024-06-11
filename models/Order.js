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
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Pending'
    },
    orderDate: {
        type: String,
        default: () => formatDateThai(new Date()),
        required: true
    },
}, { versionKey: false });

orderSchema.pre('save', function(next) {
    const thaiDateParts = this.dateDelivery.split('/');
    if (thaiDateParts.length === 3) {
        const formattedDate = `${thaiDateParts[0]}/${thaiDateParts[1]}/${thaiDateParts[2]}`;
        this.dateDelivery = formattedDate;
    }
    next();
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
