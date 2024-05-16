import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName: {
        type: String
    },
    status: {
        type: Boolean,
        default: 0
    }
},{timestamps:true});

const Product = mongoose.model('Product', productSchema);

export default Product;