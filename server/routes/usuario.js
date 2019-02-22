const express = require('express');
const app = express();
const bcrypt = require('bcrypt'); 
const Usuario = require('../models/usuarios');
const _ = require('underscore');
app.get('/usuario', (req,res)=>{
    let cnt = Number(req.query.limite) || 0;
    let salto = Number(req.query.salto) || 0;
    console.log(req.query.salto);
    //FILTRAR CAMPOS A DEVOLVER 
    Usuario.find({},'nombre email role')
    .skip(salto)
    .limit(cnt)
    .exec((err,data)=>{
        if(err)
         return res.status(400).json({
            ok:false,
            err
        });

       Usuario.count((err,conteo)=>{
        if(err)
        return res.status(400).json({
           ok:false,
           err
       });

       res.json({
           ok:true,
           data,
           conteo
       })
       
       })
    })
});


app.post('/usuario', (req,res)=>{


    let usuario = new Usuario({
        nombre:req.body.nombre,
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password,10),
        role:req.body.role
       
    })
    usuario.save((err,data)=>{
        if(err)
         return res.status(400).json({
            ok:false,
            err
        });
        
            res.json({data})
        
    });


   

   

   
  
});
app.put('/usuario/:id', (req,res)=>{
    let id = req.params.id
    //FILTRAR CAMPOS QUE SE CONVERSEN EN EL OBJETO ELIMINANDO LOS DEMAS QUE NO APAREZCAN
    let body = _.pick(req.body,['nombre','email','role','estado']);
    Usuario.findByIdAndUpdate(id,body, {new:true,runValidators:true},(err,data)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
      

       res.json({
           ok:true,
           data
       })
    })
   
});
app.delete('/usuario/:id', (req,res)=>{
    let id = req.params.id
    console.log(id);
    
    Usuario.findByIdAndUpdate(id,{estado:false},{new:true},(err,data)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            data
        })


    })
    // Usuario.findByIdAndRemove(id,(err,usuarioDelete)=>{
    //     if(err){
    //         return res.status(400).json({
    //             ok:false,
    //             err
    //         });
    //     }
    //     else if(!usuarioDelete){
    //         return res.status(400).json({
    //             ok:false,
    //             err:{
    //                 message:'Usuario no encontrado'
    //             }
    //         });
    //     }

    //     res.json({
    //         ok:true,
    //         usuarioDelete
    //     })

    // })

    
});

module.exports = app;