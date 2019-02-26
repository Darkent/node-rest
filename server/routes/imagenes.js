const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const {autenticaToken} = require('../middlewares/autenticacion');

app.get('/imagenes/:tipo/:img',[autenticaToken],(req,res)=>{


    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImg = path.resolve(__dirname,`../../uploads/${tipo}/${img}`);
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{

        let notImg = path.resolve(__dirname,'../assets/no-image.jpg')
        res.sendFile(notImg);
    }

   
   
})


module.exports = app;