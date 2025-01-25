import express from "express";
import sendResponse from "../helpers/sendResponse.js";
import jwt  from "jsonwebtoken";
import "dotenv/config";
import { authenticationUser } from "../middleware/authentication.js";


const router = express.Router()
router.put("/",authenticationUser, async (req,res) => {

    try {
        const {city,country} = req.body
        const user = await User.findById(req.user._id)
     console.log("req.user=>",req.user);
     
    } catch (error) {
        sendResponse(res,500,null,true, error.message)
    }



})

export default router;