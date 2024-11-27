const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    color:{ type:String, required:true},
    stockCount:{ type:Number, required:true},

    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category',
    //     required: true,
    // },
    category:{type:String ,required:true},
    description:{type:String, required:true},
    images: { type: [String], required: true }, 
    isListed: { type: Boolean, default: true } 
});

module.exports = mongoose.model('Product', productSchema);


