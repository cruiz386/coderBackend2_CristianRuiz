import { Router } from "express";
import { sendGmailRegister, sendGmailPurchase } from './../../controllers/email.controller.js';


const emailRouter = Router();


emailRouter.post("/purchase", sendGmailPurchase);
emailRouter.post("/users/register", sendGmailRegister)
 
export default emailRouter;