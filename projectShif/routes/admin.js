const express = require('express')
const router = express.Router()
const login = require('../controller/admin/login')
// const User = require('../model/userModel')
const Adminsession = require('../middleware/adminAuth')
const user = require('../controller/admin/user')


const Admin = require('../model/adminModel');
const categoryController = require('../controller/admin/categoryController');


const productController = require('../controller/admin/productController');
const { upload } = require('../middleware/imageUpload');
// const { userpage } = require('../controller/admin/user')




router.get('/categories', categoryController.loadCategories);
router.post('/categories', categoryController.addCategory);
router.post('/categories/:id/edit', categoryController.editCategory);
router.post('/categories/:id/toggle-status', categoryController.categoryStatus);

router.get('/products', productController.loadProducts);

router.post('/products', upload.array('images', 3), productController.addProduct);

router.get('/products/:id',productController.getProductDetails);

router.post('/products/:id/list-unlist', productController.listUnlistProduct);

router.get('/editproduct/:id', productController.loadEditProduct); 
router.post('/editproduct/:id', upload.array('images', 3), productController.updateProduct); 

router.get('/addproduct',productController.loadAddproduct);
                                     

router.get('/login',Adminsession.isLogin, login.loadLogin)
router.post('/login', login.login)




router.get('/dashboard',Adminsession.checkSession, (req, res) => {
    res.render('admin/dashboard'); 
});



// router.get('/users',user.loadUser)
   

router.get('/users',user.userpage)


router.patch('/users/:id/status', user.userblock);


module.exports = router