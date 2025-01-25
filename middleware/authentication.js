import sendResponse from "../helpers/sendResponse.js";
import   jwt  from "jsonwebtoken";
import "dotenv/config";



export async function authenticationUser(req,res,next) {

    try {
        const barearToken = req.headers.authorization
        const token = barearToken?.split(" ")[1]
        if(!token) return sendResponse(res,403,null,true, "token is not provided")
        
        const decoded = jwt.verify(token, process.env.AUTH_SECRET)
        if(decoded){
            const user = await User.findById(decoded._id)
            if(user) return sendResponse(res,403,null,true, "user not found")
        req.user = decoded
        next()
        }
        else{
            sendResponse(res,500,null,true, error.message)
        }
        res.send("working")
    } catch (error) {
        sendResponse(res,500,null,true, error.message)
    }
}
