const mongoose = require('mongoose');
const Chatroom = require('../Models/Chatroom');
  

exports.createChatroom = async (req, res) => {
 const {name} = req.body
//  const nameRegex = /^[A-Za-z\s]+$/;
//  if(!nameRegex){
//     res.json({
//         message: "Chatroom name can contain only alphabets."
//     });
//  }
 const chatroomExists = await Chatroom.findOne({name});
 if(chatroomExists) throw "Chatroom with that name already exists!";
 const chatroom = new Chatroom({name : name});
    await chatroom.save();
    res.json({
        message: "Chatroom ["+name+"] created successfully!"
    });

}