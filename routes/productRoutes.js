const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product');
const CategoryModel = require('../models/category');
const Prod2CatModel = require('../models/prod2cat');


module.exports = router;

router.post('/create', async (req, res) => {
    const product = new ProductModel({
        name: req.body.name,
        description: req.body.description,
        features: req.body.features,
        status: req.body.status
    })
    try {
        const dataToSave = await product.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }

})

router.get('/get-all', async (req, res) => {
    try {
        let products = await ProductModel.find();
        // map products from mongo object to json
        products=products.map(product=>product.toObject());
        for (const product of products) {
            const p2c = await Prod2CatModel.find({ product_id: product._id });
            let categories=[];
            for (const item of p2c) {
                const category = await CategoryModel.findById(item.category_id);
                categories.push(category.name);
            };
            product.categories = categories;
            
            // parse string to json, then map it to an array of objects
            product.features=Object.entries(JSON.parse(product.features)).map(([key, value]) => ({ [key]: value }));
        }

        res.json(products)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        let product = await ProductModel.findById(req.params.id).then(doc => doc.toObject());
        const p2c = await Prod2CatModel.find({ product_id: req.params.id });
        
        // getting categories by lookups
        let categories = [];
        for (const item of p2c) {
            const category = await CategoryModel.findById(item.category_id);
            categories.push(category.name);
        };
        product.categories = categories;
        
        // parse string to json, then map it to an array of objects
        product.features=Object.entries(JSON.parse(product.features)).map(([key, value]) => ({ [key]: value }));
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await ProductModel.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.findByIdAndDelete(id);
        res.send(`Product with name ${product.name} and age ${product.age} has been deleted.`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})