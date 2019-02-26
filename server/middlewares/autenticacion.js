const jwt = require('jsonwebtoken');


let autenticaToken = (req,res,next)=>{
    let token = req.query.token ? req.query.token : req.get('token');
    
    jwt.verify(token,process.env.SEED,(err,decoded)=>{
        if(err)
         return res.status(500).json({
            ok:false,
            er :{
                message:err
            }
        });
        

        if(!decoded)
        return res.status(500).json({
            ok:false,
            err
        });

        req.usuario = decoded.data;
       
        next();
    })
}


let revisaRole = (req,res,next) =>{

    let usuario = req.usuario;
    console.log(usuario);

    if(usuario.role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            ok:false,
            err:{
                message:"No tiene autorización para crear o modificar registros de usuarios."
            }
        })
    }

    next();

}

module.exports = {
    autenticaToken,
    revisaRole
};