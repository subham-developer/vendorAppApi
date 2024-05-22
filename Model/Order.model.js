import mongoose from "mongoose";
// var myDate = new Date();
// var date = myDate.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
// var date = moment(myDate).format('YYYY-MM-DD HH:mm:ss').toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
// var myDateInitUsingISODateWrapper = ISODate();

const orderSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    // productId: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Product' 
    // },
    vendorId:{
        type: mongoose.Schema.Types.Array,
        ref: 'User'
    },
    quantity: {
        type: Number
    },
    date: {
        type: Date, 
        default: Date.now()
    },
    status: {
        type: Boolean,
        default: 0
    }
},{timestamps:true});

const Order = mongoose.model('Order', orderSchema);

export default Order;

// To show how populate is used, first create a person object,

// aaron = new Person({firstname: 'Aaron'}) and an event object,

// event1 = new Event({title: 'Hackathon', location: 'foo'}):

// aaron.eventsAttended.push(event1);
// aaron.save(callback); 

// Person
// .findOne({ firstname: 'Aaron' })
// .populate('eventsAttended') // only works if we pushed refs to person.eventsAttended
// .exec(function(err, person) {
//     if (err) return handleError(err);
//     console.log(person);
// });