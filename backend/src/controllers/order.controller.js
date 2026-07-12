const Order = require("../models/Order");

// Create
exports.createOrder = async (req,res)=>{

    try{

        const order = await Order.create(req.body);

        res.status(201).json(order);

    }catch(err){

        res.status(500).json({
            message:err.message
        });

    }

};

// Get All

exports.getOrders = async(req,res)=>{

    try{

        const orders = await Order.find().sort({createdAt:-1});

        res.json(orders);

    }catch(err){

        res.status(500).json({
            message:err.message
        });

    }

};

// Get One

exports.getOrder = async(req,res)=>{

    try{

        const order = await Order.findById(req.params.id);

        if(!order){

            return res.status(404).json({
                message:"Order not found"
            });

        }

        res.json(order);

    }catch(err){

        res.status(500).json({
            message:err.message
        });

    }

};

// Update

exports.updateOrder = async(req,res)=>{

    try{

        const order = await Order.findByIdAndUpdate(

            req.params.id,

            req.body,

            {new:true}

        );

        res.json(order);

    }catch(err){

        res.status(500).json({
            message:err.message
        });

    }

};

// Delete

exports.deleteOrder = async(req,res)=>{

    try{

        await Order.findByIdAndDelete(req.params.id);

        res.json({
            message:"Deleted Successfully"
        });

    }catch(err){

        res.status(500).json({
            message:err.message
        });

    }

};