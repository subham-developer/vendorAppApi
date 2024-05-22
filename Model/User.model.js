import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    usertype: {
        type: String,
        enum: ['Vendor', 'Client'],
        default: 'Client'
    },
    email:{
        type: String,
        // unique: [true, "Email Id is already in use."],
    },
    contactno:{
        type: Number,
        // unique: [true, "Phone number is already in use."],
    },
    password:{
        type: String,
    },
    vendorList:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        },
        productName:{
            type: String,
        },
        vendorName: {
            type: String
        },
        vendorContactNo: {
            type: String
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

// userSchema.virtual('amount', {
//     ref: 'Product',
//     localField: '_id',
//     foreignField: 'productId'
//   });
const User = mongoose.model('User', userSchema);

export default User;