
const express = require('express');
const router = express.Router();
const {createChatroom} = require('../Controllers/chatroomController');
const {catchErrors} = require('../handlers/errorHandler');
const {auth} = require('../Middlewares/auth');

router.post('/make',auth, catchErrors(createChatroom));

module.exports = router;