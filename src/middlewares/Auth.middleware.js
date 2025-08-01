import userModel from "../DB/models/user.model.js";
import { verifyToken } from "../utils/tokens/token.js";
import { Types } from "mongoose";

export const roleTypes ={
    User : "User",
    Admin : "Admin",
}
export const authentication = async (req, res, next) =>{
    try{ 
        const {authorization} = req.headers;
        if(!authorization){ //falsy value for token
            return res.status(401).json({success: false, message: "Authorize token is required"});
        }
        const [signature, token] = authorization.split(' ');
        let TOKEN_SIGNATURE = undefined;
        switch(signature){
            case "Admin":  
            TOKEN_SIGNATURE = process.env.TOKEN_SECRET_ADMIN;
            break;
            case "Bearer": 
            TOKEN_SIGNATURE = process.env.TOKEN_SECRET_USER;
            break;
            default: break;
        }
        const decoded = verifyToken({token: token, signature: TOKEN_SIGNATURE});
        const user = await userModel.findById(decoded.id);
        if(!user){
            return res.status(404).json({success: false, message: "user is not found"});
        }
        req.user = user;
        return next();
    }
    catch(error){
        return res.status(500).json({success: false, stack: error.stack});
    }
}
export const allowto = (roles=[])=>{
    return async(req, res, next)=>{ // middleware
        try{
            if(!roles.includes(req.user.role))
            {
                return res.status(403).json({success: false, message: "Forbidden Account!!!"});
            }
            return next();
        }
        catch(error){
            return res.status(500).json({success: false, stack: error.stack});
        }
    };
}
