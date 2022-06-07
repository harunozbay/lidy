const express = require('express');
const router = express.Router();
const CategoryModel = require('../models/category');
const Prod2CatModel = require('../models/prod2cat');

module.exports = router;

router.post('/create', async (req, res) => {
    const data = new CategoryModel({
        name: req.body.name,
        parent_id: req.body.parent_id
    })
    
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }

})

router.get('/get-all', async (req, res) => {
    try {
        const data = await CategoryModel.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        const data = await CategoryModel.findById(req.params.id);
        res.json(data)
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

        const result = await CategoryModel.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        //delete category
        const deletedCat = await CategoryModel.findByIdAndDelete(id);
        // delete parent_id field of found categories
        await CategoryModel.updateMany({parent_id:id},{$unset:{"parent_id":1}});
        // delete related product to categories documents
        await Prod2CatModel.deleteMany({category_id:id});
        
        res.send(`Document with name ${deletedCat.name} and age ${deletedCat.age} deleted.`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})