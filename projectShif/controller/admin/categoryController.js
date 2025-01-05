const Category = require('../../model/categoryModel');
const Product = require('../../model/productModel');
const StatusCodes = require('../../utils/statusCode');


const loadCategories = async(req,res)=>{
    const page=parseInt(req.query.page) || 1
    const limit=5;
    const skip=(page -1)* limit
    try{
        const totalCategory=await Category.countDocuments()
        const categories= await Category.find().skip(skip).limit(limit)
        const totalPages=Math.ceil(totalCategory/limit)
        res.render('admin/category',{
            categories,
            currentPage:page,
            totalPages,
            error: null, success: null 
        })
    
    }
    catch(error){
        console.error(error)
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('server error')

    }
}



// const addCategory = async (req, res) => {
//     try {
//         const { name, description } = req.body;

//         if (!name || !description) {
//         const error = 'Name and Description cannot be empty.';
//         return res.render('admin/categories', { error, success: null, categories: await Category.find() });
//         }
//         const trimmedName = name.trim().toLowerCase(); 
       
//         const oldCategory = await Category.findOne({ 
//             name: { $regex: `^${trimmedName}$`, $options: 'i' }
//           });

//         // const oldCategory = await Category.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
//  if(oldCategory){
//     return res.status(400).json({message:"The category may alredy exist"})
//  }

//         // if (oldCategory) {
//         //   return res.redirect('/admin/categories')
//         // }
//          const newCategory = new Category({ name, description });
//         // const newCategory = new Category({ name: name.trim(), description });
//          await newCategory.save();

//         res.redirect('/admin/categories');
//     } catch (error) {
//         console.error(error);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Failed to add category');
//     }
// };








// const addCategory = async (req, res) => {
//     try {
//         const { name, description } = req.body;

//         if (!name || !description) {
//             return res.status(400).json({ message: 'Name and Description cannot be empty.' });
//         }

//         // const trimmedName = name.trim().toLowerCase();

//         // const oldCategory = await Category.findOne({
//         //     name: { $regex: `^${trimmedName}$`, $options: 'i' },
//         // });

//         // if (oldCategory) {
//         //     return res.status(400).json({ message: 'The category already exist.' });
//         // }

//         // const newCategory = new Category({ name, description });
//         // await newCategory.save();




//         const trimmedName = name.trim();

//         // Check for an existing category with the same name (case-insensitive)
//         const existingCategory = await Category.findOne({
//             name: { $regex: `^${trimmedName}$`, $options: 'i' }, // Regex for case-insensitive match
//         });

//         if (existingCategory) {
//             return res.status(400).json({ message: 'Category already exists.' });
//         }

//         // Create and save the new category
//         const newCategory = new Category({ 
//             name: trimmedName, 
//             description 
//         });
//         await newCategory.save();

//         return res.status(200).json({ message: 'Category added successfully!' });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Failed to add category.' });
//     }
// };





const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            const error = 'Name and Description cannot be empty.';
            return res.render('admin/categories', { error, success: null, categories: await Category.find() });
        }

        // Normalize the input name (trim and convert to lowercase)
        const normalizedInputName = name.trim().toLowerCase();

        // Check if a category with the same normalized name exists
        const oldCategory = await Category.findOne({
            name: { $regex: `^${normalizedInputName}$`, $options: 'i' } // Case-insensitive exact match
        });

        if (oldCategory) {
            const error = 'Category name already exists.';
            return res.render('admin/categories', { error, success: null, categories: await Category.find() });
        }

        // Create and save the new category
        const newCategory = new Category({ 
            name: name.trim(), 
            description 
        });
        await newCategory.save();

        res.redirect('/admin/categories');
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Failed to add category');
    }
};



  


const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        if (!name || !description) {
            const categories = await Category.find();
            return res.render('admin/category', {
                categories,
                error: 'Name and Description cannot be empty.',
                success: null,
            });
        }

        const existingCategory= await Category.findOne({name,_id:{$ne:id}})
        if(existingCategory){
            console.log('category already exist');
            return res.redirect('/admin/categories')
                
        }

        await Category.findByIdAndUpdate(id, { name, description });
        res.redirect('/admin/categories');
    } catch (error) {                   
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Failed to edit category');
    }
};


const categoryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(StatusCodes.NOT_FOUND).send('Category not found');
        }


        category.isListed = !category.isListed;
        await category.save();

   

        res.redirect('/admin/categories');
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.NOT_FOUND).send('Failed to toggle category status');
    }
};



module.exports = {
    loadCategories,
    addCategory,
    editCategory,
    categoryStatus
};
