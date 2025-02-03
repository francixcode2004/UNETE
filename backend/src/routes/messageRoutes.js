import {messageUser,getMessages,deleteMessage} from "../controller/messageController.js";
import express from "express";
const router = express.Router();
router.post("/message",messageUser)
router.get("/messages",getMessages)
router.delete("/message/:id",deleteMessage)
export default router;