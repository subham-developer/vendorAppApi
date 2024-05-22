export const registerser = async(req,res) => {
    try {
        const {name,email,contactNo,password} = req.body;
    }catch(err){
        console.log(err);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Ooops!!...Something went wrong!!' });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}