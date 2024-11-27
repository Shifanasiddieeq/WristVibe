const Category = require('../../model/categoryModel');

const Product = require('../../model/productModel');

const loadCategories = async (req, res) => {
    try {
        const categories = await Category.find({}); 
        res.render('admin/category', { categories ,error: null, success: null });
    } catch (error) {
        console.error(error);
        // res.status(500).send('Failed to load categories');
        res.status(500).render('admin/category', { categories: [], error: 'Failed to load categories', success: null });
    }
};


const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
        const error = 'Name and Description cannot be empty.';
        return res.render('admin/categories', { error, success: null, categories: await Category.find() });
        }
       
        const oldCategory= await Category.findOne({name:name.trim()})
        if (oldCategory) {
          
            // return res.status(400).json({message:"Category already exist"});
          return res.redirect('/admin/categories')
        }
         const newCategory = new Category({ name, description });
         await newCategory.save();

        res.redirect('/admin/categories');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to add category');
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
        res.status(500).send('Failed to edit category');
    }
};




const categoryStatus = async (req, res) => {
    try {

    
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).send('Category not found');
        }

        category.isListed = !category.isListed;
        await category.save();

        res.redirect('/admin/categories');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to toggle category status');
    }
};

// const categoryStatus = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const category = await Category.findById(id);

//         if (!category) {
//             return res.status(404).send('Category not found');
//         }

//         // Toggle the category's isListed status
//         category.isListed = !category.isListed;
//         await category.save();

//         // Update the products under the same category
//         await Product.updateMany({ category: id }, { isListed: category.isListed });

//         res.redirect('/admin/categories');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Failed to toggle category status');
//     }
// };




module.exports = {
    loadCategories,
    addCategory,
    editCategory,
    categoryStatus
};
