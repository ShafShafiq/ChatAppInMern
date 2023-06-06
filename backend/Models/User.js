const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Please enter a the name'
    },
    email:{
        type: String,
        required: 'Please enter an the email',
    },
    
    password:{
        type: String,
        required: 'Please enter a password',
    },
    Designation:{
        type: String,
        required: 'Please enter a Designation',
    },
},{timestamps: true});

module.exports = mongoose.model('User', userSchema);