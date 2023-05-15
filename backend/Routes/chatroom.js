
const express = require('express');
const router = express.Router();
const {createChatroom,getAllChatrooms,deleteChatroom} = require('../Controllers/chatroomController');
const {catchErrors} = require('../handlers/errorHandler');
const {auth} = require('../Middlewares/auth');
//chatroom/make
router.post('/make',auth, catchErrors(createChatroom));
//chatroom/all
router.get("/all", auth, catchErrors(getAllChatrooms));
//chatroom/delete
router.delete("/delete", auth, catchErrors(deleteChatroom));

module.exports = router;