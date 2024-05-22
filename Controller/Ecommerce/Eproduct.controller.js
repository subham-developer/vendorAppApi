import Eproduct from "../../Model/Ecommerce/Eproduct.model.js";

export const addEproduct = async(req, res) =>{
    try {
        const {name, category, new_price, old_price} = req.body;
        const productImage = `/productImages/${req.file.filename}`;
        // console.log(req.body);
        // console.log(req.file);
        // console.log(req.file.filename);
        // console.log(req.file.path);
        const newProduct = new Eproduct({
            name,
            category,
            productImage,
            new_price,
            old_price
        });

        const SaveProduct = await newProduct.save();
        console.log('SaveProduct', SaveProduct);
        res.status(201).json({'message':'Product Uploaded Successfully!!','SavedProduct':SaveProduct});
    }catch(err){
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            res.status(400).json({'message':err.message});
        }
        return res.status(500).send({msg: err.message});
    }
}

export const getEProducts = async(req,res) => {
    try {
        const products = await Eproduct.find().sort({createdAt: -1});
        const totalProducts =  await Eproduct.find().count();
        res.json({'message':'List of Products','totalProducts':totalProducts,'productsList':products});
    }catch(err){
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            res.status(400).json({'message':err.message});
        }
        return res.status(500).send({msg: err.message});
    }
}