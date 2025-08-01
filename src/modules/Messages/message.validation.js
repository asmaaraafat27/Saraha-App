import joi from "joi";
import { isValidObjectId } from "../../middlewares/validation.middleware.js"

export const flags ={
    inbox: "inbox",
    sent: "sent",
}
export const sendMessageSchema = joi.object({
    content: joi.string().required(),
    receiver: joi.custom(isValidObjectId).required(),
}).required();

export const getSingleMessageSchema = joi.object({
    messageId: joi.custom(isValidObjectId).required(),
}).required();

export const getAllMessagesSchema = joi.object({
    flag: joi.valid(...Object.values(flags)).required(),
}).required();

export const deleteMessagesSchema = joi.object({
    messageId: joi.custom(isValidObjectId).required(),
}).required();

export const updateMessagesSchema = joi.object({
    messageId: joi.custom(isValidObjectId).required(),
    newContent: joi.string().required(),
}).required();