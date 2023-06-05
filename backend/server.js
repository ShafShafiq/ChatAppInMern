
require("dotenv").config();
const mongoose = require('mongoose');
const userRoutes = require('./Routes/user');
const chatroomRoutes = require('./Routes/chatroom.js');
const cors = require('cors');
//import models
require('./Models/Chatroom');
require('./Models/Message');
require('./Models/User');



const express = require('express');
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
 
//importing routes

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/users', userRoutes);
app.use('/chatroom', chatroomRoutes);
//Set error handlers
const errorHandlers = require('./handlers/errorHandler');
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if(process.env.ENV === 'DEVELOPMENT')
app.use(errorHandlers.developmentErrors);
else
app.use(errorHandlers.productionErrors);

//db connection
mongoose.connect(process.env.DATABASE , { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => {
    console.error(`Database Connection Error → ${err.message}`);
});
mongoose.connection.once('open', () => {
    console.log('Connected to Mongo');
});




app.listen(4000, () => {
    console.log('Server is running on port 4000');
}
);