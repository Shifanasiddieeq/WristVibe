const userModel = require('../model/userModel')

const checkSession = async (req, res, next) => {
    const user = await userModel.findById(req.session.user)
    
    if (req.session.user &&  user.isBlocked === false) {
        next();
    } else {
        res.redirect('/login');
   

    }
};

const isLogin = async(req, res, next) => {
    const user = await userModel.findById(req.session.user)
  
    if (req.session.user && user.isBlocked === false) {
        res.redirect('/home');
    
        
    } else {
        next();
    }
};


module.exports = {
    checkSession,
    isLogin
}