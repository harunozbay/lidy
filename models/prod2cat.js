const mongoose = require('mongoose');
const prod2cat = new mongoose.Schema({
    product_id: {
        type: mongoose.SchemaTypes.ObjectId
    },
    category_id: {
        type: mongoose.SchemaTypes.ObjectId
    }
}, 
{ 
    versionKey: false 
})

module.exports = mongoose.model('Prod2Cat', prod2cat, 'product_to_categories')