const express = require('express');
const app = express();




app.use(require('../routes/login'));
app.use(require('../routes/usuario'));
app.use(require('../routes/categorias'));
app.use(require('../routes/productos'));


module.exports = app;