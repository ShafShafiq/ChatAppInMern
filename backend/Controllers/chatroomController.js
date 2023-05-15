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

exports.getAllChatrooms = async (req, res) => {
    const chatrooms = await Chatroom.find({});

    res.json(chatrooms);
  };
  exports.deleteChatroom = async (req, res) => {
    //delete chatroom based on name
    const {name} = req.body;
    console.log(name);
    const chatroom = await Chatroom.findOneAndDelete({name});
    if(!chatroom) throw "Chatroom with that name does not exist!";
    else{
        res.json({
            message: "Chatroom ["+name+"] deleted successfully!"
        });
    }
    

  }