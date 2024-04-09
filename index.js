const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

//Connect to mongodb
mongoose.connect('mongodb+srv://ntwitmn:ntwitmn@order.3td7vxf.mongodb.net/manageOrders', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

//Schema orders table
const orderSchema = new mongoose.Schema({
    cusName: String,
    cusAddress: String,
    cusTel: String,
    cusUnit: Number,
    dateOrder: { type: Date, default: Date.now },
    dateStamp: { type: Date, default: Date.now },
    orderStatus: String,
});

//Model Orders
const Orders = mongoose.model('Orders', orderSchema);

//Get orders
app.get('/orders', async ( req, res) => {
    try {
        const orders = await Orders.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});

//Get order by ID
app.get('/order/:id', getOrders, ( req, res ) => {
    res.json(res.orders);
});

//POST new order
app.post('/orders', async ( req, res ) => {
    const orders = new Orders ({
        cusName: req.body.cusName,
        cusAddress: req.body.cusAddress,
        cusTel: req.body.cusTel,
        cusUnit: req.body.cusUnit,
        dateOrder: req.body.dateOrder,
        dateStamp: req.body.dateStamp,
        orderStatus: req.body.orderStatus
    });
    try {
        const newOrders = await orders.save();
        res.status(201).json(newOrders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Update order
app.patch('/orders/:id', getOrders, async (req, res) => {
    if (req.body.cusName != null) {
        res.orders.cusName = req.body.cusName;
    }
    if (req.body.cusAddress != null) {
        res.orders.cusAddress = req.body.cusAddress;
    }
    if (req.body.cusTel != null) {
        res.orders.cusTel = req.body.cusTel;
    }
    if (req.body.cusUnit != null) {
        res.orders.cusUnit = req.body.cusUnit;
    }
    if (req.body.dateOrder != null) {
        res.orders.dateOrder = req.body.dateOrder;
    }
    if (req.body.dateStamp != null) {
        res.orders.dateStamp = req.body.dateStamp;
    }
    if (req.body.orderStatus != null) {
        res.orders.orderStatus = req.body.orderStatus;
    }
    try {
        const updateOrders = await res.orders.save();
        res.json(updateOrders);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
});

//Delete order
app.delete('/orders/:id', getOrders, async (req, res) => {
    try {
        await res.orders.remove();
        res.json({ message: 'Deleted Order' });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});

//Middleware function order ID
async function getOrders(req, res, next) {
    let orders;
    try {
        orders = await Orders.findById(req.params.id);
        if (orders == null) {
            return res.status(404).json({ message: 'Cannot find order' });
        }
    } catch (error) {
        return res.status(500).json({ message: err.message });
    }
    res.orders = orders;
    next();
}

app.listen(3000, () => {
    console.log('Server started on port 3000');
});