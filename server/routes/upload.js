const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuarios = require('../models/usuarios');
const Productos = require('../models/productos');
app.use(fileUpload({ useTempFiles: true }));


app.put('/upload/:tipo/:id', (req, res) => {
    if (!req.files) {
        return res.status(400).json({ message: 'No hay archivos que subir.' });
    }
    let tipo = req.params.tipo;
    let id = req.params.id;
    console.log(tipo);
    let tipos = ['productos','usuarios']
    if(tipos.indexOf(tipo) < 0){
        return res.status(400).json({
            message:'Tipo no valido'
        })
    }
    

    let archivo = req.files.archivo;

    let nombreCortado = archivo.name.split(".");
  

    let extensiones = ['jpg','jpeg','png','pdf'];

    if(extensiones.indexOf(nombreCortado[1]) < 0){
        return res.status(400).json({
            message:'Extension no valida'
        })
    }
    let nombre = `${id}-${new Date().getMilliseconds() }-${archivo.name.replace(/ /g,"-")}`
    archivo.mv(`uploads/${tipo}/${nombre}`, (err) => {
        
        if (err)
            return res.status(500).json(err);


        if(tipo === 'usuarios'){
            //SUBIR IMAGENES USUARIOS
        Usuarios.findById(id,(err,usuario)=>{
            if (err)
            return res.status(400).json({
                message:'Problemas con el servidor'});

            if(!usuario)
            return res.status(400).json({
                message:'Usuario no existe'});

            usuario.img = nombre;
            usuario.save((err,guardado)=>{
                if (err)
                return res.status(400).json({
                    message:'Problemas con el servidor'});

                res.json({
                    ok:true,
                    message:'File uploaded!',
                    usuario
                })
            })
            
        })
    }
    else{
        //SUBIR IMAGENES PRODUCTOS
        Productos.findById(id,(err,producto)=>{
            if (err)
            return res.status(400).json({
                message:'Problemas con el servidor'});

            if(!producto)
            return res.status(400).json({
                message:'Producto no existe'});

            producto.img = nombre;
           
            producto.save((err,guardado)=>{
                if (err)
                return res.status(400).json({
                    message:'Problemas con el servidor'});

                res.json({
                    ok:true,
                    message:'File uploaded!',
                    producto
                })
            })
            
        })
    }

    })
});


module.exports = app;