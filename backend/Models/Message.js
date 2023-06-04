const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.ObjectId,
        required: 'chat room needed'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: 'user needed'
    },
    message: {
        type: String,
        required: 'message needed'
    },
   
});

module.exports = mongoose.model('Message', messageSchema);