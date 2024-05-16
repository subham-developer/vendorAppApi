import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    usertype: {
        type: String,
        enum: ['Vendor', 'Client'],
    },
    email:{
        type: String,
        unique: [true, "Email Id is already in use."],
    },
    contactno:{
        type: Number,
        // unique: [true, "Phone number is already in use."],
    },
    status: {
        type: Boolean,
        default: 0
    }

},{ timestamps: true});
const User = mongoose.model('User', userSchema);

export default User;