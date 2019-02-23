//=========================
        //CONFIRUACIONES
//=========================




//=========================
        //PUERTO
//=========================

process.env.PORT = process.env.PORT || 3000;


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';





//=========================
        //DATA BASE
//=========================

let uri;


if(process.env.NODE_ENV === 'dev'){
        uri = 'mongodb://localhost/cafe';
}
else{
        uri = process.env.MONGOURI;
}

process.env.urlBD = uri;


//=========================
        //CADUCIDAD_TOKEN
//=========================

process.env.CADUCIDAD = 60 * 60 * 24 * 30;


//=========================
        //SEED_TOKE
//=========================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


