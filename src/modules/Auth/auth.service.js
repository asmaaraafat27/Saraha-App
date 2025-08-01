import userModel from "../../DB/models/user.model.js";
import { roleTypes } from "../../middlewares/Auth.middleware.js";
import { emailEmitter } from "../../utils/Email/emailEvent.js";
import {hash, compare} from "../../utils/Hashing/hash.js"
import { encrypt } from "../../utils/Encryption/encryption.js";
import { generateToken, verifyToken } from "../../utils/tokens/token.js";

export const register = async (req, res, next) => {
    const {email, password, phone} = req.body;

    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return next(new Error("user already exists"), {cause: 409});
    }

    //hashing
    const hashPassword = hash({plainText: password, saltRound: process.env.SALT}); // blocking code
    //encryption
    const encryptPhone = encrypt({plainText: phone, signature: process.env.ENCRYPTION_SECRET});
    
    const user = await userModel.create({
      ...req.body,
      email,
      password: hashPassword,
      phone: encryptPhone,
    });
    //send email confirmation
    emailEmitter.emit("sendEmail", user.email, user.userName);

    return res.status(201).json({success: true, message:"user created successfully!"});
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new Error("user not found!"), {cause: 404});
    }
    if (!user.confirmEmail) {
      return next(new Error("please confirm your Email!!!"), {cause: 404});
    }
    const match = compare({plainText: password , hash: user.password})//async to block code
    if (!match) {
      return next(new Error("incorrect password!"), {cause: 400});
    }
    const token = generateToken({
      payload: { id: user._id, isLoggedIn: true }, 
      signature: user.role === roleTypes.User
        ? process.env.TOKEN_SECRET_USER
        : process.env.TOKEN_SECRET_ADMIN, 
      options: 
      {
        expiresIn: 60 * 60,
      }
    }
  );
    return res.status(200).json({success: true, message:"User logged in successfully!", token});
};

export const activateAccount = async (req, res, next) => {
    const { token } = req.params;
    if (!token) {
      return next(new Error("Token must be provided!"), {cause: 400}); 
    } 
    const { email } = verifyToken({token: token, signature: process.env.TOKEN_SECRET_EMAIL});  
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new Error("Token must be provided!"), {cause: 400});
    }
    user.confirmEmail = true;
    await user.save();
    return res.status(200).json({success: true, message:"Email Confirmed Successfully!"});
};
