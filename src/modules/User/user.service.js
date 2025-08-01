import userModel from "../../DB/models/user.model.js";
import { decrypt, encrypt } from "../../utils/Encryption/encryption.js";

export const getUser = async(req, res, next) => {
        const{user} = req //from req --> middleware
        //decrypt
        user.phone = decrypt({encrypted: user.phone, signature: process.env.ENCRYPTION_SECRET})

        return res.status(200).json({success: true, message: "user is found", results: user});
};

export const updateProfile = async(req, res, next) => {
        if(req.body.phone){
                req.body.phone = encrypt({plainText: req.body.phone, signature: process.env.ENCRYPTION_SECRET});
        };
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {...req.body}, { new: true, runValidators: true });
        return res.status(200).json({ success: true, message: "User Updated Successfully!", results: {user: updatedUser}});
}