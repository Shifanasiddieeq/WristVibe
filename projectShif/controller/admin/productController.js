const Product = require('../../model/productModel');
const Category = require('../../model/categoryModel');

// const loadProducts = async (req, res) => {
//     try {
        
//         const products = await Product.find(); 
//         res.render('admin/product', { products});
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Failed to load products');
//     }
// };


const loadProducts=async(req,res)=>{
    // Pagination route in your admin product controller
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const limit = 10; // Number of products per page
    const skip = (page - 1) * limit; // Skip items for pagination

    try {
        const totalProducts = await Product.countDocuments(); // Total number of products
        const products = await Product.find()
            .skip(skip) // Skip products for the current page
            .limit(limit); // Limit the number of products per page

        const totalPages = Math.ceil(totalProducts / limit);

        res.render('admin/product', {
            products,
            currentPage: page,
            totalPages,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}


const loadAddproduct = async(req,res)=>{
   
        try {
            const products = await Product.find({});
            const categories = await Category.find({ isListed: true }); 
            res.render('admin/addProduct', { products, categories });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).send('Internal Server Error');
        }
        
    };
   

const addProduct = async (req, res) => {
    
    try {
        const { productName, brand, price, color, category,stockCount ,description} = req.body;
        
        console.log();
        const imagePath = req.files.map(file => `/uploads/${file.filename}`)

        if (!productName || !brand || !price || !color ||!category || !stockCount || !description) {
            return res.status(400).json({ message: "All fields are required." });
        }
        
        console.log(productName, brand, price,color,category, stockCount ,description,imagePath);
        
        console.log('hthtyh',category);
        
        const newProduct = new Product({
            productName,
            brand,
            price,
            color,
            category,
            stockCount,
            description,
            images: imagePath   
            
        })
        newProduct.save()

        res.status(200).json({success:true})
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to add product');
    }
};



const loadEditProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId); 

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('admin/editproduct', { product });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to load product details');
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log('f;fghjkl');
        
        const {
            productName,
            brand,
            price,
            color,
            category,
            stockCount,
            description,
        } = req.body;

        
        const newImagePaths = req.files?.map(file => `/uploads/${file.filename}`) || [];

       
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        product.productName = productName;
        product.brand = brand;
        product.price = price;
        product.color = color;
        product.category = category;
        product.stockCount = stockCount;
        product.description = description;

        if (newImagePaths.length) {
            product.images = newImagePaths;
        }

        await product.save();
        res.status(200).redirect('/admin/products')
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update product' });
    }
};



const getProductDetails = async (req, res) => {
      
    try {
        const product = await Product.findById(req.params.id);        
        res.json(product); 
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).send('Failed to fetch product details');
    }
};


const listUnlistProduct = async (req, res) => {
    try {
        console.log('list');
        
        const { id } = req.params;
        
        const product = await Product.findById(id);
        if (product) {
            product.isListed = !product.isListed; 
            await product.save(); 
            res.redirect('/admin/products'); 
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to list/unlist product');
    }
};




module.exports = { loadProducts, addProduct,updateProduct ,
    getProductDetails ,loadEditProduct ,listUnlistProduct,
    loadAddproduct };
