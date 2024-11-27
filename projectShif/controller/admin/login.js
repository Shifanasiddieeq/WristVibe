const adminemail = "admin@gmail.com";
const adminpass= "Admin@12"; 


const loadLogin = async (req,res) =>{
    res.render('admin/login')
}

const login = async (req,res)=>{
    const { email, password } = req.body;

    if (email === adminemail && password === adminpass) {
        req.session.admin = true
        return res.redirect('/admin/dashboard');
    }

    res.render('admin/login', {
        errorMessage: "Invalid email or password.",
    });
} 

module.exports = {
    loadLogin,
    login
}