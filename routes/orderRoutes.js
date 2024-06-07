const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders, sorted by status (Pending first)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ orderStatus: 1 });
        res.json(orders);
        console.log('Get order successfully!!');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get orders with status Pending
router.get('/status/pending', async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: 'Pending' });
        res.json(orders);
        console.log('Get pending orders successfully!!');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get orders with status Success
router.get('/status/success', async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: 'Success' });
        res.json(orders);
        console.log('Get success orders successfully!!');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get order by ID
router.get('/:id', getOrder, (req, res) => {
    res.json(res.order);
    console.log('Get order by ID successfully!!');
});

// POST create new order
router.post('/', async (req, res) => {
    const order = new Order({
        cusName: req.body.cusName,
        cusAddress: req.body.cusAddress,
        cusPhone: req.body.cusPhone,
        orderUnit: req.body.orderUnit,
        dateDelivery: req.body.dateDelivery,
    });
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
        console.log('Create new order successfully!!');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update order
router.put('/:id', getOrder, async (req, res) => {
    if (req.body.cusName != null) {
        res.order.cusName = req.body.cusName;
    }
    if (req.body.cusAddress != null) {
        res.order.cusAddress = req.body.cusAddress;
    }
    if (req.body.cusPhone != null) {
        res.order.cusPhone = req.body.cusPhone;
    }
    if (req.body.orderUnit != null) {
        res.order.orderUnit = req.body.orderUnit;
    }
    if (req.body.dateDelivery != null) {
        res.order.dateDelivery = req.body.dateDelivery;
    }
    if (req.body.orderStatus != null) {
        res.order.orderStatus = req.body.orderStatus;
    }
    try {
        const updatedOrder = await res.order.save();
        res.json(updatedOrder);
        console.log('Update order successfully!!');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE order
router.delete('/:id', getOrder, async (req, res) => {
    try {
        await res.order.deleteOne();
        res.json({ message: 'Order delete successfully!!' });
        console.log('Delete order successfully!!');
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log('Error, Cannot delete order');
    }
});

// Dashboard statistics
router.get('/dashboard/stats', async (req, res) => {
    try {
        const pendingOrdersCount = await Order.countDocuments({ orderStatus: 'Pending' });
        const successOrdersCount = await Order.countDocuments({ orderStatus: 'Success' });
        const pendingUnitsCount = await Order.aggregate([
            { $match: { orderStatus: 'Pending' } },
            { $group: { _id: null, totalUnits: { $sum: "$orderUnit" } } }
        ]);
        const successUnitsCount = await Order.aggregate([
            { $match: { orderStatus: 'Success' } },
            { $group: { _id: null, totalUnits: { $sum: "$orderUnit" } } }
        ]);

        res.json({
            pendingOrdersCount,
            successOrdersCount,
            pendingUnitsCount: pendingUnitsCount[0] ? pendingUnitsCount[0].totalUnits : 0,
            successUnitsCount: successUnitsCount[0] ? successUnitsCount[0].totalUnits : 0,
        });
        console.log('Get dashboard stats successfully!!');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get order by ID
async function getOrder(req, res, next) {
    let order;
    try {
        order = await Order.findById(req.params.id);
        if (order == null) {
            return res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.order = order;
    next();
}

module.exports = router;
