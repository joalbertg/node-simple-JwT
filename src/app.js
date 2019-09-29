const express = require('express');
const app = express();

// el servidor ya puede interpretar archivos JSON
app.use(express.json());
// el servidor ya puede entender los datos de un formulario
// y pasarlos a un objeto JS
app.use(express.urlencoded({ extended: false }));

module.exports = app;
