const User = require('../../model/userModel')



// const loadUser = async(req,res) => {
//     res.render('admin/users')
 
    
// }

// const userpage = async(req,res)=>{

//     try {
        
//         const users = await User.find(); 
//         console.log(users);
        
//         res.render('admin/users', { users });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Failed to fetch users');
//     }
// }


const userpage =async (req, res) =>{
    // Pagination for users route

    const page = parseInt(req.query.page) || 1; // Current page (default to 1 if not provided)
    const limit = 10; // Number of users per page
    const skip = (page - 1) * limit; // Calculate how many users to skip

    try {
        const totalUsers = await User.countDocuments(); // Total number of users
        const users = await User.find() // Fetch users for the current page
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(totalUsers / limit); // Calculate total pages

        res.render('admin/users', {
            users,
            currentPage: page,
            totalPages,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}


const userblock = async(req,res)=>{
    try {
        const { block } = req.body;
        
        const userId = req.params.id;

       
        const updatedUser = await User.findByIdAndUpdate(userId, { isBlocked: block }, { new: true });

        if (updatedUser) {
            const status = block ? 'Blocked' : 'Unblocked';
            return res.json({ success: true, message: `User ${status} successfully` });
        } else {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update user status' });
    }
}

module.exports = {
    userpage,userblock
}