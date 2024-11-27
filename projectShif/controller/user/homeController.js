const User = require('../../model/userModel')

const Product = require('../../model/productModel')




// const loadHome = async (req,res) =>{
//     const userId =req.session.user 
//     const user = await User.findById(userId);
//     console.log(user);
    
//     if (user.isBlocked) {
     
//         return res.status(401).redirect('/login');
//     }
//     try {
//         req
//         const products = await Product.find({ isListed: true }); 
//         res.render('user/home', { products }); 
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
  
// }

// Example of pagination logic in Express.js
const loadHome=async(req,res)=>
{
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = 10; // Number of products per page
    const skip = (page - 1) * limit; // Skipping products for the current page

    try {
        // Fetch products with pagination
        const products = await Product.find({isListed:true}).skip(skip).limit(limit); 
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit); // Calculate total pages

        // Render the homepage with pagination data
        res.render('user/home', {
            products,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}


module.exports = {
    loadHome
}