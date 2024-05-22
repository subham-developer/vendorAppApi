import Vendor from "../Model/Vendor.model";

export const registerVendor = async(req, res) =>{

    try{
        const {clientId, username, usertype, email, contactno, transactionDetails} = req.body;
        console.log('transactionDetails',transactionDetails);
        const checkContactNoExist = await Vendor.findOne({contactno});
        // if(!checkContactNoExist){
            const saveVendor = new Vendor({
                username: username,
                usertype: usertype,
                email: email,
                contactno: contactno,
                transactionDetails,
                status: 1
            });
            const response = await saveVendor.save();
            console.log('response',response);
            return res.send({status: 200, message:'Vendor Saved!!'});
        // }else{
            // const newComment = new User({
            //     productId: req.body.text,
            //     name: user.name,
            //     avatar: user.avatar,
            //     user: req.user.id
            // });
            // post.comments.unshift(newComment);
            // await post.save();
            // return res.status(400).json({ errors: [{ msg: 'Vendor already exists' }] });
        // }
        // res.status(200).json(blogPosts);
    }catch(err){
        console.error(err.message);
        return res.status(500).send({msg: err.message});
    }
}