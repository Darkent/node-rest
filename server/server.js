const express = require('express');
const app = express();
const bodyParser= require('body-parser');
require('../config/config');

app.use(bodyParser.urlencoded({extended:false}));

app.get('/usuario', (req,res)=>{

    res.json('get usuario')
});
app.post('/usuario', (req,res)=>{
    let persona =req.body

    res.json({persona})
});
app.put('/usuario/:id', (req,res)=>{
    let id = req.params.id
    res.json({id})
});
app.delete('/usuario', (req,res)=>{

    res.json('delete usuario')
});


app.listen(process.env.PORT, ()=> {
    console.log('Servidor corriendo');
})