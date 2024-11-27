const express=require('express')
const router=express.Router()
const userContoller = require('../controller/user/userController')
const homeController = require('../controller/user/homeController')
const shopController = require('../controller/user/shopController')
const authController = require('../config/passportSetup') 
const userSession = require('../middleware/userAuth')

router.get('/login',userSession.isLogin,userContoller.loadLogin)
router.post('/login',userContoller.loginpage)
router.get('/register',userSession.isLogin,userContoller.loadRegister)
router.post('/register',userContoller.registerUser)
router.get('/registerOTP', userContoller.loadOtp)

router.get('/home',userSession.checkSession,homeController.loadHome)
router.get('/shop',userSession.checkSession,shopController.loadShop)
router.get('/productDetails/:id',shopController.productDetails)


router.post('/verify-otp',userContoller.verifyOtp)

router.post('/user/resend-otp', userContoller.resendOtp)
router.get('/logout',userContoller.logout);


module.exports = router

