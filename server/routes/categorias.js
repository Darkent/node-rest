const express = require('express');
const Categoria = require('../models/categorias');
const {autenticaToken,revisaRole} = require('../middlewares/autenticacion')
const app = express();


//CREANDO UNA CATEGORIA

app.get('/categoria',(req,res)=>{
    
    Categoria.find({})
    .sort('descripcion')
    .populate('usuario','nombre email')
    .exec((err,categorias)=>{
        if(err) return res.status(500).json({
            ok:false,
            err:{
                message:'Ocurrio un error con la base de datos'
            }
        })

        res.json({
            categorias
        })
    })

});

//CREANDO NUEVA CATEGORIA

app.post('/categoria',[autenticaToken,revisaRole],(req,res)=>{
    let body = req.body;
    let cate = new Categoria({
        descripcion : body.descripcion,
        usuario : req.usuario._id
    })

    cate.save((err,categoria)=>{
        if(err) return res.status(500).json({
            ok:false,
            err:{
                message:'Ocurrio un error con la base de datos'
            }
        })
        res.json({
            categoria
        })

    })
})

//BUSCANDO CATEGORIA POR ID

app.get('/categoria/:id',(req,res)=>{
    let id = req.params.id;
    Categoria.findById(id,(err,categoria)=>{
        if(err) return res.status(500).json({
            ok:false,
            err:{
                message:'Ocurrio un error con la base de datos'
            }

            
        })

        res.json({
            categoria
        })

    })
})


app.put('/categoria/:id', [autenticaToken,revisaRole] ,(req,res)=>{
    let id = req.params.id;
    let body = req.body;
    Categoria.findByIdAndUpdate(id, body,{new:true,runValidators:true}, (err,categoria)=>{
        if(err) return res.status(500).json({
            ok:false,
            err:{
                message:'Ocurrio un error con la base de datos'
            }

            
        })

        res.json({
            categoria
        })

    })
})


app.delete('/categoria/:id', [autenticaToken,revisaRole] , (req,res)=>{
    let id = req.params.id;
    Categoria.findByIdAndRemove(id,(err,deleteUser)=>{
        if(err) return res.status(500).json({
            ok:false,
            err:{
                message:'Ocurrio un error con la base de datos'
            }       
        })
        res.json({
            ok:true,
            message:'Categoria eliminada'
        })

    })
})


module.exports = app;