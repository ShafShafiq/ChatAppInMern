const express = require('express');
const app = express();
const cors = require('cors');



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(require('cors')());

 
//Set error handlers
const errorHandlers = require('./handlers/errorHandler');
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if(process.env.ENV === 'DEVELOPMENT')
app.use(errorHandlers.developmentErrors);
else
app.use(errorHandlers.productionErrors);

module.exports = app;  