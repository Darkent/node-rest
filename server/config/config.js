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
        uri = 'mongodb://Darkent:wLipw3lQguDdzQPV@cluster0-shard-00-00-xwb72.mongodb.net:27017,cluster0-shard-00-01-xwb72.mongodb.net:27017,cluster0-shard-00-02-xwb72.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
}

process.env.urlBD = uri;


