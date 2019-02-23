const express = require('express');
const app = express();
const bcrypt = require('bcrypt'); 
const Usuario = require('../models/usuarios');
const jwt = require('jsonwebtoken');

require('../config/config');


app.post('/login', (req, res) =>{

    let body = req.body;

    Usuario.findOne({email:body.email},(err,usuario)=>{
        if(err)
         return res.status(500).json({
            ok:false,
            err
        });

        if(!usuario){
            return res.status(500).json({
                ok:false,
                message:'Contraseña o (usuario) no valido'
            });
        }

        if(!bcrypt.compareSync(body.password,usuario.password)){
            return res.status(500).json({
                ok:false,
                message:'(Contraseña) o usuario no valido'
            });
        }
       
        let secret = process.env.SEED;
        let caducidad = process.env.CADUCIDAD;
        let token = jwt.sign(
           { data:usuario},
            secret,
            {expiresIn:caducidad}
        )

        res.json({
            ok:true,
            usuario,
            token
        })


    })

   
})

module.exports = app;