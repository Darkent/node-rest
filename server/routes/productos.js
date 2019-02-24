const express = require('express');
const Producto = require('../models/productos');
const {autenticaToken,revisaRole} = require('../middlewares/autenticacion')
const app = express();


//BUSQUEDA

app.get('/producto/buscar/:termino', (req,res)=>{

    let termino = req.params.termino;
    let regx = new RegExp(termino,'i')
    Producto.find({nombre:regx})
    .exec((err,productos)=>{
        if(err) return res.status(500).json({
            ok:false,
            err:{
                message:'Ocurrio un error con la base de datos'
            }
        })
        else if(!productos || productos.length === 0) return res.status(400).json({
            message:'No existe el producto'
        })

        res.json({
            productos
        })
    })
})


//CREANDO UNA CATEGORIA

app.get('/producto',(req,res)=>{
    
    Producto.find({})
    .limit(10)
    .populate('usuario','nombre email')
    .populate('categoria','descripcion')
    .exec((err,productos)=>{
        if(err) return res.status(500).json({
            ok:false,
            err:{
                message:'Ocurrio un error con la base de datos'
            }
        })

        res.json({
            productos
        })
    })

});

//CREANDO NUEVA CATEGORIA

app.post('/producto',[autenticaToken,revisaRole],(req,res)=>{
    let body = req.body;
    let product = new Producto({
        nombre : body.nombre,
        precioUni : body.precioUni,
        descripcion : body.descripcion,
        categoria : body.categoria,
        usuario : req.usuario._id
    })

    product.save((err,producto)=>{
        if(err) return res.status(500).json({
            ok:false,
            err
        })
        res.json({
            producto
        })

    })
})

//BUSCANDO CATEGORIA POR ID

app.get('/producto/:id',(req,res)=>{
    let id = req.params.id;
    Producto.findById(id,(err,producto)=>{
        if(err) return res.status(500).json({
            ok:false,
            err:{
                message:'Ocurrio un error con la base de datos'
            }

            
        })

        res.json({
            producto
        })

    })
})


app.put('/producto/:id', [autenticaToken,revisaRole] ,(req,res)=>{
    let id = req.params.id;
    let body = req.body;
    Producto.findByIdAndUpdate(id, body,{new:true,runValidators:true}, (err,producto)=>{
        if(err) return res.status(500).json({
            ok:false,
            err:{
                message:'Ocurrio un error con la base de datos'
            }

            
        })

        res.json({
            producto
        })

    })
})


app.delete('/producto/:id', [autenticaToken,revisaRole] , (req,res)=>{
    let id = req.params.id;
    Producto.findByIdAndUpdate(id,{disponible:false},{new:true},(err,deleteItem)=>{
        if(err) return res.status(500).json({
            ok:false,
            err:{
                message:'Ocurrio un error con la base de datos'
            }       
        })
        else if(!deleteItem) return res.status(400).json({
            message:'id no existe'
        })
        

        res.json({
            ok:true,
            message:'Producto no disponible',
            deleteItem
        })

    })
})


module.exports = app;