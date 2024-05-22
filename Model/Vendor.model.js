import mongoose from "mongoose";

const vendorSchema = mongoose.Schema({
    username: {
        type: String,
    },
    usertype: {
        type: String,
        enum: ['Vendor', 'Client'],
        default: 'Vendor'
    },
    email:{
        type: String,
    },
    contactno:{
        type: Number,
    },
    transactionDetails:[{
        clientId:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        },
        productId:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        },
        price:{
            type: String
        }
    }],
    status: {
        type: Boolean,
        default: 0
    }

},{ timestamps: true});
const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;