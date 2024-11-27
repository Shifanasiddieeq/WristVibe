const Product = require('../../model/productModel')
const categorySchema=require('../../model/categoryModel')
// const loadShop = async (req,res) =>{

//     try {
//             const products = await Product.find({ isListed: true }); 
//             res.render('user/shop', { products }); 
//         } catch (error) {
//             console.error(error);
//             res.status(500).send('Server Error');
//         }
        
//     }

const loadShop=async(req,res)=>{
   
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // Number of products per page
        const skip = (page - 1) * limit;
        const categories= await categorySchema.find({isListed:true})
    
        try {
            // Fetch products with pagination
            const products = await Product.find({isListed:true})
                .skip(skip)
                .limit(limit);
    
            // Get total count for pagination calculation
            const totalProducts = await Product.countDocuments();
    
            // Calculate total pages
            const totalPages = Math.ceil(totalProducts / limit);
    
            res.render('user/shop', {
                categories,
                products,
                totalPages,
                currentPage: page
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
   
    
}



const productDetails = async(req,res)=>{

    try {
        // const product = await Product.findById(req.params.id);
        // if (!product) return res.status(404).send('Product not found');
        const product = await Product.findOne({ 
            _id: req.params.id, 
            isListed: true 
        });

        if (!product) {
            return res.status(404).send('Product not found or unlisted');
        }

        const relatedProduct = await Product.find({
            isListed:true,
            category:product.category,
            _id:{$ne:req.params.id},
            
        })
        res.render('user/productDetails', { product,relatedProduct });
      } catch (err) {
        res.status(500).send('Server Error');
      }

}

module.exports = {
    loadShop,productDetails
}

