import Order from "../Model/Order.model.js";
import Product from "../Model/Product.model.js";
import User from "../Model/User.model.js";
// import User from "../Model/User.model";
// import Product from "../Model/Product.model";


export const addOrders = async(req, res) => {
    try {
        const { userId, vendorId, productId, quantity, status } = req.body;
        // let date = new Date().toISOString;
        // Check if Vendor is available inside vendorList Array 
        const UserId = await User.findOne({_id:userId, 'vendorList._id': vendorId});
        console.log('UserId',UserId);
        // exit();
        if(!UserId || UserId == null){
            return res.status(404).json({ message: "Vendor Is not Registered" });
        }
        
        // const getProductId = await Product.findOne({_id:productId});
        // console.log(UserId,getProductId);
        // if(!UserId && UserId == null || !getProductId && getProductId == null){
        //     return res.status(404).json({message: "User or Product not found"});
        // }
        const getUserId = await Order.findOne({userId, vendorId});
        console.log('getUserId', getUserId);
        if(!getUserId || getUserId == null){
            try{
                const order = new Order({
                    userId,
                    vendorId,
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
            let order = await Order.findById(orderId).populate('userId',{
                createdAt: 0,
                updatedAt: 0,
                // vendorList: 0,
                __v: 0
            });
            console.log(order.userId);
            let quantity = order.quantity;
            let vendorDetails = await order.userId.vendorList.filter((vendor)=>{
                return vendor._id.toString() === order.vendorId[0];
            })
            console.log(order);
            let billAmount = Number(vendorDetails[0].price * quantity);
            // let billAmount = 0;
            console.log('billAmount',billAmount);
            if(order){
                return res.status(200).json({'billAmount': billAmount, 'orderDetails': order});
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
            }).populate('vendorId.vendorList',{
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