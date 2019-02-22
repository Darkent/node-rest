const express = require('express');
const mongoose = require('mongoose');
const app = express();


const bodyParser= require('body-parser');

require('./config/config');

app.use(bodyParser.urlencoded({extended:false}));


app.use(require('./routes/usuario'))

mongoose.connect('mongodb://Darkent:wLipw3lQguDdzQPV@cluster0-shard-00-00-xwb72.mongodb.net:27017,cluster0-shard-00-01-xwb72.mongodb.net:27017,cluster0-shard-00-02-xwb72.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',(err)=>{
    if(!err) console.log('DB conectada');
});

app.listen(process.env.PORT, ()=> {
    console.log('Servidor corriendo');
})