import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import User from '../../Model/User.model.js';


export const login = async(req,res)=>{
    try {
        const {contactno,password} = req.body;
        const user = await User.findOne({contactno});
        console.log('user',user)
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const checkPassword  = await bcrypt.compare(password, user.password);
        console.log('checkPassword',checkPassword)
        if(!checkPassword){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const payload = {
            user: {
                id: user.id
            },
        };
        let token = jwt.sign({
            payload,
          }, 'secret', { expiresIn: '1h' });
          console.log('token',token);
          return res.json({ token: token, user: user });
        

        
    }catch(err){
        console.log(err);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Ooops!!...Something went wrong!!' });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}