import { EventEmitter } from "events";
import { sendEmail, subject } from "./sendEmail.js";
import { signUp } from "./generateHTML.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../tokens/token.js";

export const emailEmitter = new EventEmitter();

emailEmitter.on("sendEmail", async(email,userName)=>{
    //send email confirmation
    const token = generateToken({ payload: { email }, signature: process.env.TOKEN_SECRET_EMAIL});
    const link = `http://localhost:3000/auth/activateAcc/${token}`;
    const isSent = await sendEmail({
      to: email,
      subject: subject.register,
      html: signUp(link, userName),
    });
})

