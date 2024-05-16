import User from "../Model/user.model";


export const addUser = async(req, res) =>{

    try{
        const {username, usertype, email, contactno} = req.body;
        const checkEmailExist = await User.findOne({email});
        if(!checkEmailExist){
            const saveUser = new User({
                username: username,
                usertype: usertype,
                email: email,
                contactno: contactno,
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

export const getUser = async(req,res) => {
    // {contactno:0} means to exclude
    // {contactno:1} means to include
    let users = await User.find({},{contactno:0}).sort({createdAt: -1});
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
        console.log('users', users);
        if(!users){
            return res.send({status: 400, message:'User Not Found !!'});
           
        }else{
            return res.send({status: 200, users: users, message:'Successfull !!'});
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



