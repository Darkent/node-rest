const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require ('path');

const bodyParser= require('body-parser');

require('./config/config');

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.resolve(__dirname,'../public')));


app.use(require('./routes/index'))

mongoose.connect(process.env.urlBD ,(err)=>{
    if(!err) console.log('DB conectada');
    
});

app.listen(process.env.PORT, ()=> {
    console.log('Servidor corriendo');
})