const mongoose = require('mongoose');
const category = new mongoose.Schema({
    name:{
        type:String
    },
    parent_id:{
        type: mongoose.SchemaTypes.ObjectId
    }
},
{
    versionKey: false
})

module.exports=mongoose.model('Category', category)