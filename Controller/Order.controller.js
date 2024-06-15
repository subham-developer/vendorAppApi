import Order from "../Model/Order.model.js";
import Product from "../Model/Product.model.js";
import User from "../Model/User.model.js";
// import User from "../Model/User.model";
// import Product from "../Model/Product.model";


export const addOrders = async(req, res) => {
    try {
        const { userId, vendorId, productId, quantity, status } = req.body;

        let numQuantity = Number(quantity);
        let numStatus = Number(status);
        let totalPrice = 0;

        const UserId = await User.findOne({_id:userId, 'vendorList._id': vendorId});

        const user = await User.findById({_id:userId});
        let vendorProductPrice = await user.vendorList.filter((vendor)=>{
            return vendor._id.toString() === vendorId;
        })
        totalPrice = numQuantity * Number(vendorProductPrice[0].price);
        console.log('vendorDetails.......', totalPrice);
        console.log('vendorProductPrice.......', Number(vendorProductPrice[0].price));
        if(!UserId || UserId == null){
            return res.status(404).json({ message: "Vendor Is not Registered" });
        }
        
    
        const getUserId = await Order.findOne({userId, vendorId});
        
        if(!getUserId || getUserId == null){
            try{
                const order = new Order({
                    userId:userId,
                    vendorId:vendorId,
                    quantity:numQuantity,
                    totalPrice: totalPrice,
                    status:numStatus
                });
                const saveOrder = await order.save();
                console.log('saveOrder', saveOrder._id);
                const updateUsers = await User.findOneAndUpdate(
                    {
                    _id: userId, 
                    vendorList: { $elemMatch: { _id: vendorId } }
                    },
                    {
                        $set:{
                        "vendorList.$.orderId": saveOrder._id
                        }
                    },{new: true}
                )
                res.status(201).json({ message: "New Order added successfully", 'updatedOrder': saveOrder });
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
                const totalQuantity = getUserId.quantity + numQuantity;
                totalPrice = totalQuantity * Number(vendorProductPrice[0].price);
                const updatedOrder = await Order.findByIdAndUpdate(getUserId._id, {
                    $set: {
                        quantity: totalQuantity,
                        totalPrice: totalPrice,
                        status:numStatus
                    },
                //  new: True is to get the update version of the doc
                    },{new: true}); 
                console.log('updatedOrder', updatedOrder);
                res.status(201).json({ message: "Order updated successfully", 'updatedOrder': updatedOrder });

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