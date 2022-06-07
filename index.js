require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString=process.env.DATABASE_URL;
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const prod2catRoutes = require('./routes/prod2catRoutes');



mongoose.connect(mongoString);
const database=mongoose.connection;

database.on('error',(error)=>{
    console.log(error);
})

database.once('connected', ()=>{
    console.log('Database connected');
})

const app= express();
app.use(express.json());

app.use('/category',categoryRoutes);
app.use('/product',productRoutes);
app.use('/prod2cat', prod2catRoutes);

app.listen(3000,()=>{
    console.log('Server started at 3000');
});