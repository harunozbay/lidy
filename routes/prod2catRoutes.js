const express = require('express');
const router = express.Router();
const Prod2CatModel = require('../models/prod2cat');

module.exports = router;

router.post('/create', async (req, res) => {
    const data = new Prod2CatModel({
        product_id: req.body.product_id,
        category_id: req.body.category_id
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
        const data = await Prod2CatModel.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/get/:id', async (req, res) => {
    try {
        const data = await Prod2CatModel.findById(req.params.id);
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

        const result = await Prod2CatModel.findByIdAndUpdate(id, updatedData, options);
        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Prod2CatModel.findByIdAndDelete(id);
        res.send(`Document with name ${data.name} and age ${data.age} has been deleted.`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})