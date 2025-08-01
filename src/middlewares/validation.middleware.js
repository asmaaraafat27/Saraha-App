import { roleTypes } from "./Auth.middleware.js";
import { Types } from "mongoose";
import joi from "joi";

export const validation = (schema) =>{
    return (req,res, next)=>{
        const data = {...req.body, ...req.params, ...req.query}
        const results = schema.validate(data, {aportEarly: false});
        if(results.error){
            const errorMessage = results.error.details.map((obj) => obj.message);
            return next(new Error(errorMessage, {cause: 400}));
        }
        return next();
    }
};

export const isValidObjectId = (value, helper) =>{
    if(Types.ObjectId.isValid(value)) return true;
    return helper.message("Invalid objectId");
}

export const generalFields = {
    userName: joi.string().min(3).max(20).
    message({'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username must be at most 20 characters long', 'any.required': 'Username is required', 'string.empty': 'Username is required',
    }),
    email: joi.string().email().messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required',
      'string.empty': 'Email is required'
    }),
    password: joi.string().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is required'
    }),
    confirmPassword: joi.string().valid(joi.ref('password')).messages({
    'any.only': 'Confirm password does not match password'}),
    role: joi.string().valid(...Object.values(roleTypes)).messages({
      'any.only': 'Invalid role selected'
    }),
    phone: joi.string(),
};
