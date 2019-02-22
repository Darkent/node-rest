const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const validator = require ('mongoose-unique-validator');
let roles ={
    values : ['USER_ROLE', 'ADMIN_ROLE'],
    message: ' {VALUE} no es un rol'
}
let usuarioSchema = new Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es necesario.']
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'El correo es necesario.']
        
    },
    password:{
        type:String,
        required:[true, 'El password es necesario.']
    },
    img:{
        type:String,
        required:false
    },
    role:{
        type:String,
        enum:roles,
        default: 'USER_ROLE'
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }

});

usuarioSchema.methods.toJSON = function (){
    let user = this;
    let userOb = user.toObject();
    delete userOb.password;
    return  userOb;
}

usuarioSchema.plugin(validator,{message: 'El {PATH} ya existe '});

module.exports = mongoose.model('Usuario',usuarioSchema);