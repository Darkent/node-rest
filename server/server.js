const express = require('express');
const mongoose = require('mongoose');
const app = express();


const bodyParser= require('body-parser');

require('./config/config');

app.use(bodyParser.urlencoded({extended:false}));


app.use(require('./routes/usuario'))

mongoose.connect('mongodb+srv://Darkent:0sXZErwGritLLCH9@cluster0-az1b1.mongodb.net/test?retryWrites=true',(err)=>{
    if(!err) console.log('DB conectada');
});

app.listen(process.env.PORT, ()=> {
    console.log('Servidor corriendo');
})