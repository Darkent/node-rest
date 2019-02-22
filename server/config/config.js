//=========================
        //CONFIRUACIONES
//=========================

process.env.PORT = process.env.PORT || 3000;


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


let uri;


if(process.env.NODE_ENV === 'dev'){
        uri = 'mongodb://localhost/cafe';
}
else{
        uri = process.env.MONGOURI;
}

process.env.urlBD = uri;


