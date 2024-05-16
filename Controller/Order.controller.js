import Order from "../Model/Order.model";
import Product from "../Model/Product.model";
import User from "../Model/user.model";
// import User from "../Model/User.model";
// import Product from "../Model/Product.model";


export const addOrders = async(req, res) => {
    try {
        const { userId, productId, quantity, status } = req.body;
        // let date = new Date().toISOString;
        const UserId = await User.findOne({_id:userId});
        const getProductId = await Product.findOne({_id:productId});
        console.log(UserId,getProductId);
        if(!UserId && UserId == null || !getProductId && getProductId == null){
            return res.status(404).json({message: "User or Product not found"});
        }
        const getUserId = await Order.findOne({userId, productId});
        console.log('getUserId', getUserId);
        if(!getUserId || getUserId == null){
            try{
                const order = new Order({
                    userId,
                    productId,
                    quantity,
                    status
                });
                const saveOrder = await order.save();
                console.log('saveOrder', saveOrder);
                res.status(201).json({ message: "New Order added successfully" });
            }catch(err){
                console.log(err);
                if (err.kind == 'ObjectId') {
                    return res.status(400).json({ msg: 'Ooops!!...Something went wrong!!' });
                }
                res.status(500).json({ message: "Internal Server Error" });
            }
            
        }else{
            try{
                console.log('quantity', getUserId.quantity);
                const totalQuantity = getUserId.quantity + quantity;
                const updatedOrder = await Order.findByIdAndUpdate(getUserId._id, {
                    $set: {
                        quantity: totalQuantity,
                        status:status
                    },
                //  new: True is to get the update version of the doc
                    },{new: true}); 
                console.log('updatedOrder', updatedOrder);
                res.status(201).json({ message: "Order updated successfully", 'updatedOrder': updatedOrder });
                // return res.status(200).json(updatedOrder);
            }catch(err){
                console.log(err);
                if (err.kind == 'ObjectId') {
                    return res.status(400).json({ msg: 'Ooops!!...Something went wrong!!' });
                }
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
        
        
    }catch(err){
        console.log(err);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Ooops!!...Something went wrong!!' });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllOrders = async(req,res) =>{
    try{
        const orderId = req.params.orderId;
        if(orderId){
            const order = await Order.findById(orderId).populate('userId',{
                createdAt: 0,
                updatedAt: 0,
                __v: 0
            }).populate('productId',{
                createdAt: 0,
                updatedAt: 0,
                __v: 0
            });
            if(order){
                return res.status(200).json(order);
            }else{
                return res.status(400).json({ msg: 'OrderId Not Found' });
            }
        }else{
            const orders = await Order.find({},
                // {
                //     createdAt: 0
                // }
            ).populate('userId',{
                createdAt: 0,
                updatedAt: 0,
                __v: 0
            }).populate('productId',{
                createdAt: 0,
                updatedAt: 0,
                __v: 0
            }).sort({createdAt: -1});
            return res.status(200).json(orders);
        }
    }catch(err){
        console.log(err);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Ooops!!...Something went wrong!!' });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
} 