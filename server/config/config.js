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
        uri = 'mongodb+srv://Darkent:0sXZErwGritLLCH9@cluster0-az1b1.mongodb.net/test?retryWrites=true';
}

process.env.urlBD = uri;


