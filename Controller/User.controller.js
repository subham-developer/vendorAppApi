import User from "../Model/User.model.js";
import bcrypt from "bcrypt";


export const addUser = async(req, res) =>{

    try{
        const {username, usertype, vendorList, password, contactno} = req.body;
        const checkContactNoExist = await User.findOne({contactno});
        // Generating Password
        const saltRounds = 10;
        // const myPlaintextPassword = 's0/\/\P4$$w0rD';
        const hash = await bcrypt.hashSync(password, saltRounds);
        const hassPassword = "$2b$10$8hYnkoYTmGtPYxNMqOhxJe53HLzk6TaMkntatbwWsDNInxHlFYLca";
        const checkPassword  = await bcrypt.compare(password, hassPassword);
        console.log('checkPassword', checkPassword)
        console.log('hash',hash)
        if(!checkContactNoExist){ 
            const saveUser = new User({
                username: username,
                usertype: usertype,
                password: hash,
                // email: email,
                contactno: contactno,
                vendorList: vendorList,
                status: 1
            });
            const response = await saveUser.save();
            console.log('response',response);
            return res.send({status: 200, message:'User Saved!!'});
        }else{
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }
        // res.status(200).json(blogPosts);
    }catch(err){
        console.error(err.message);
        return res.status(500).send({msg: err.message});
    }
}

export const assignVendorToClients = async(req, res) =>{ 
    try{
        const {clientId, price, productId, productName: productName, vendorName, vendorContactNo} = req.body;
        if(!clientId){
            return res.status(400).json({ errors: [{ msg: 'Client Id is required' }] });
        }
        const checkClientExist = await User.findById(clientId);
        // console.log('checkClientExist',checkClientExist);
        if(!checkClientExist){
            return res.status(400).json({ errors: [{ msg: 'Client does not exist' }] });
        }else{
            const saveUser = {
                productName: productName,
                vendorName: vendorName,
                vendorContactNo: vendorContactNo,
                price: price,
                // email: email,
            };
            const response = await checkClientExist.vendorList.unshift(saveUser);
            const saveVendors = await checkClientExist.save();
            console.log('response',saveVendors.vendorList);
            return res.send({status: 200, vendors: saveVendors.vendorList, message:'Vendor Saved!!'});
        }
    }catch(err){
        console.error(err.message);
        return res.status(500).send({msg: err.message});
    }
}

export const getUser = async(req,res) => {
    // {contactno:0} means to exclude
    // {contactno:1} means to include
    let users = await User.find({},{createdAt: 0, updatedAt: 0, __v: 0}).populate('vendorList.productId',{createdAt: 0, updatedAt: 0, __v: 0}).sort({createdAt: -1}).exec();
    console.log('users',users);
    const totalUser =  await User.find().count();
    return res.send({status: 200, totalUser: totalUser, users: users, message:'Successfull !!'});
}

export const getUserById = async(req,res) => {
    // console.log('getUserById');
    try{
        const user_id = req.params.user_id;
        // console.log('user_id',user_id)
        // console.log('id',req.query.id)
        const users = await User.findOne({_id:user_id});
        let totalVendorsAssigned = users.vendorList.length;
        console.log('users', users);
        if(!users){
            return res.send({status: 400, message:'User Not Found !!'});
           
        }else{
            return res.send({status: 200, 'totalVendorsAssigned': totalVendorsAssigned, users: users, message:'Successfull !!'});
        }
    }catch(err){
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'User not found' });
        }
        return res.status(500).send({msg: err.message});
    }

}

export const updateUserById = async(req,res) => {
    console.log('updateUserById');
    const {username, usertype, email, contactno} = req.body;
    try{
        const user_id = req.params.user_id;
        console.log('user_id',user_id)
        // console.log('id',req.query.id)
        const users = await User.findOne({_id:user_id});
        console.log('users', users);
        if(!users){
            return res.send({status: 400, message:'User Not Found !!'});
        }else{
            try{
                const user = await User.findByIdAndUpdate(req.params.user_id, {
                 $set: {
                    username: username,
                    usertype: usertype,
                    email: email,
                    contactno: contactno,
                    status: 1
                 },
                //  new: True is to get the update version of the doc
                 },{new: true}); 
                return res.status(200).json(user);
             }catch(err){
                return res.status(500).send({msg: err.message});
             }
            // return res.send({status: 200, users: users, message:'Successfull !!'});
        }
    }catch(err){
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'User not found' });
        }
        return res.status(500).send({msg: err.message});
    }

}

export const deleteUserById = async(req,res) => {
    // console.log('getUserById');
    try{
        const user_id = req.params.user_id;
        // console.log('user_id',user_id)
        // console.log('id',req.query.id)
        const users = await User.findOne({_id:user_id});
        // console.log('users', users);
        if(!users){
            return res.send({status: 400, message:'User Not Found !!'});
           
        }else{
            const deleteUser = await User.findByIdAndDelete(req.params.user_id);
            // console.log('deleteUser',deleteUser);
            return res.send({message:'User Deleted Successfully !!'});
        }
    }catch(err){
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'User not found' });
        }
        return res.status(500).send({msg: err.message});
    }

}



