
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




const server = app.listen(4000, () => {
    console.log('Server is running on port 4000');

}
);



const jwt = require('jsonwebtoken');
const io = require('socket.io')(server,{
    cors: {
        origin: "http://localhost:3000",
    }
});
// io.use(async(socket, next )=>{
//  try {
//     const token = socket.handshake.query.token;
//     const payload = jwt.verify(token, process.env.JWT_SECRET
//          );
//     socket.userId = payload.id;
//     next();
//   } catch (err) {
    
//   }
// });
// io.on('connection', (socket) => {
//     console.log('Connected: ' + socket.userId);
//     socket.on('disconnect', () => {
//         console.log('Disconnected: ' + socket.userId);
//     });
// }
// );
// io.use(async (socket, next) => {
//     try {
//       const token = socket.handshake.query.token;
//       const payload = await jwt.verify(token, process.env.SECRET);
//       socket.userId = payload.id;
//       next();
//     } catch (err) {}
//   });
  
//   io.on("connection", (socket) => {
//     console.log("Connected: " + socket.userId);
  
//     socket.on("disconnect", () => {
//       console.log("Disconnected: " + socket.userId);
//     });
// });
const Message = mongoose.model("Message");
const User = mongoose.model("User");

io.use(async (socket, next) => {
    try {
      const token = socket.handshake.query.token;
      const payload = await jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload._id;
      next();
    } catch (err) {
      // Handle the error, for example:
      console.error(err);
      next(new Error("Authentication error"));
    }
  });
  
  io.on("connection", (socket) => {
    console.log("Connected: " + socket.userId);
  
    socket.on("disconnect", () => {
      console.log("Disconnected: " + socket.userId);
    });


    socket.on("joinRoom", ({ chatroomId }) => {
     socket.join(chatroomId);
      console.log("A user joined chatroom: " + chatroomId); 
    });

    socket.on("leaveRoom", ({ chatroomId }) => {  
      socket.leave(chatroomId);
      console.log("A user left chatroom: " + chatroomId);
    });

    socket.on("chatroomMessage", async ({ chatroomId, message }) => {
      if(message.trim().length > 0){
        const user = await User.findOne({_id: socket.userId});
        const newmessage = new Message({
          chatroom: chatroomId,
          user: socket.userId,
          message,
        });
        io.to(chatroomId).emit("newMessage", {
          message,
          name: user.name,
          userId: socket.userId,
          
        });

        await newmessage.save();
      }
      
    });
  });
  