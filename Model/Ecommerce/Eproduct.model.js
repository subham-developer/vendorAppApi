import mongoose from 'mongoose'


const eproductSchema = mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    productImage: {
        type: String
    },
    new_price: {
        type: String
    },
    old_price: {
        type: String
    },

},{timeStamp:true});

const Eproduct = mongoose.model('eproduct',eproductSchema);
export default Eproduct;