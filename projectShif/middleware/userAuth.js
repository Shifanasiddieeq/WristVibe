const userModel = require('../model/userModel')

const checkSession = async (req, res, next) => {
    const user = await userModel.findById(req.session.user)

    
    if (!user) {
       return res.redirect('/login')
    } else if(req.session.user &&  user.isBlocked === false) {
        return next();
    }
        return  res.redirect('/login');
};

const isLogin = async(req, res, next) => {
    const user = await userModel.findById(req.session.user)
    if (!user) {
        next();
    } else if(req.session.user && user.isBlocked === false){
        res.redirect('/home');
    }
};


module.exports = {
    checkSession,
    isLogin
}