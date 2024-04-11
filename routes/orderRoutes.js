const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

//Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.json(orders);
        console.log('Get order successfully!!');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get order by ID
router.get('/:id', getOrder, (req, res) => {
    res.json(res.order);
    console.log('Get order by ID successfully!!');
});

//POST create new order
router.post('/', async (req, res) => {
    const order = new Order({
        cusName: req.body.cusName,
        cusAddress: req.body.cusAddress,
        cusPhone: req.body.cusPhone,
        orderUnit: req.body.orderUnit,
        dateDelivery: req.body.dateDelivery,
        // orderStatus: req.body.orderStatus,
    });
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
        console.log('Create new order successfully!!');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//PUT update order
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
        const updateOrder = await res.order.save();
        res.json(updateOrder);
        console.log('Update order successfully!!');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Delete order
router.delete('/:id', getOrder, async (req, res) => {
    try {
        await res.order.remove();
        res.json({ message: 'Order delete successfully!!'});
        console.log('Delete order successfully!!');
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log('Error, Cannot delete order');
    }
});

//Middleware function to get order by ID
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