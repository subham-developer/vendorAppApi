import Product from "../Model/Product.model";

export const addProduct = async(req,res) => {
    try{
        const {productName, status} = req.body;
        const addProduct = new Product({
            productName,
            status
        });

        const saveProduct = await addProduct.save();
        console.log('saveProduct', saveProduct);

        return res.send({status: 200, message:'Product Added!!'});
    }catch(err){
        console.error(err.message);
        return res.status(500).send({msg: err.message});
    }
} 

export const getProducts = async(req,res)=>{
    try{
        if(req.params.prodId){
            try{
                const getProductById = await Product.findById({_id:req.params.prodId});
                if(!getProductById){
                    return res.send({status: 400, message:'User Not Found !!'});
                }else{
                    return res.send({status: 200, products: getProductById, message:'All Product Fetched!!'});
                }
            }catch(err){
                console.error(err.message);
                if (err.kind == 'ObjectId') {
                    return res.status(400).json({ msg: 'Product not found' });
                }
                return res.status(500).send({msg: err.message});
            }
            
        }else{
            const getAllProducts = await Product.find().sort({createdAt: -1});
            const totalProduct =  await Product.find().count();
            return res.send({status: 200, totalProduct: totalProduct, products: getAllProducts, message:'All Product Fetched!!'});
        }
    }catch(err){
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Product not found' });
        }
        return res.status(500).send({msg: err.message});
    }
}

export const updateProductById = async(req,res)=>{
    try{
        const {productName, status} = req.body;
        if(req.params.prodId){
            const getProductById = await Product.findById({_id:req.params.prodId});
            if(!getProductById){
                return res.send({status: 400, message:'Product Not Found !!'});
            }else{
                try{
                    const updateProduct = await Product.findByIdAndUpdate(req.params.prodId,{
                        $set:{
                            productName,
                            status
                        }
                    },{new: true});
                    return res.send({status: 200, product: updateProduct, message:'Product Updated Successfully!!'});
                }catch(err){
                    console.error(err.message);
                    if (err.kind == 'ObjectId') {
                        return res.status(400).json({ msg: 'Product not found' });
                    }
                    return res.status(500).send({msg: err.message});
                }
            }
        }
    }catch(err){
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Product not found' });
        }
        return res.status(500).send({msg: err.message});
    }
}

export const deleteProductById = async(req, res) => {
    try{
        if(req.params.prodId){
            const getProductById = await Product.findById({_id:req.params.prodId});
            if(getProductById){
                const deleteProduct = await Product.findByIdAndDelete(req.params.prodId);
                return res.send({message:'Product Deleted Successfully !!'});
            }
        }
    }catch(err){
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Product not found' });
        }
        return res.status(500).send({msg: err.message});
    }
}