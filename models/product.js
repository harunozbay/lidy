const mongoose = require('mongoose');
const product = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type: String
    },
    features:{
        type:String
    },
    status:{
        type:Number
    }
},
{
    versionKey: false
})

module.exports=mongoose.model('Product', product)