import messageModel from "../../DB/models/message.model.js";
import userModel from "../../DB/models/user.model.js";
import { flags } from "./message.validation.js";


export const sendMessage = async(req, res, next) => {

    const { content, receiver } = req.body;

    const user = await userModel.findById(receiver);
    if(!user){
        return next(new Error("user not found", {cause: 404}));
    }
    const message = await messageModel.create({
        content,
        receiver,
        sender: req.user._id,
    });
    return res.status(200).json({success: true, message:"message sent successfully!", results: message});
};

export const getSingleMessage = async(req, res, next) => {
    const { messageId } = req.params;
    const message = await messageModel.findById(messageId).populate([
        {path: "sender", select: "userName email -_id"},
        {path: "receiver", select: "userName email -_id"}
    ]);
    if(!message){
        return next(new Error("message not found", {cause: 404}));
    }
    //Authorization check
    if(message.receiver?.email  === user.email ||
        message.sender?.email === user.email
    ){
        return res.status(200).json({success: true, results: message});
    }
    return next(new Error("Unauthorized", {cause: 403}));
};

export const getAllMessages = async(req, res, next) => {
    const { flag } = req.query;
    return res.status(200).json({success: true, 
        results: flag == flags.inbox 
        ? await messageModel.find({receiver: req.user._id}) 
        : await messageModel.find({sender: req.user._id})
    });
};

export const deleteMessage = async(req, res, next) => {
    const { messageId } = req.params;
    const message = await messageModel.findById(messageId);
    if(!message){
        return next(new Error("message not found", {cause: 404}));
    }
    // Authorization check
    if(message.receiver.toString() !== req.user._id.toString() &&
       message.sender.toString() !== req.user._id.toString()){
        return next(new Error("Unauthorized to delete this message", {cause: 403}));
    }
    const deleteResult = await messageModel.deleteOne({_id: messageId});
    if(deleteResult.deletedCount === 0){
        return next(new Error("message could not be deleted", {cause: 404}));
    }
    return res.status(200).json({success: true, message:"message deleted permanently"});
};

export const updateMessage = async(req, res, next) => {
    const { messageId } = req.params;
    const { newContent } = req.body;
    const message = await messageModel.findById(messageId);
    if(!message){
        return next(new Error("message not found", {cause: 404}));
    }
    // Authorization check for sender
    if(message.sender.toString() !== req.user._id.toString()){
        return next(new Error("Unauthorized to delete this message", {cause: 403}));
    }
    const updateResult = await messageModel.updateOne({_id: messageId} , {content: newContent});
    const updatedMessage = await messageModel.findById(messageId);
    return res.status(200).json({success: true, message:"message updated successfully!", results: updatedMessage});
};