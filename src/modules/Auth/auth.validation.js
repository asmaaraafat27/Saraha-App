import joi from "joi";
import { generalFields } from "../../middlewares/validation.middleware.js";

export const registerSchema = joi.object({
    userName: generalFields.userName.required(),
    email: generalFields.email.required(),
    password: generalFields.password.required(),
    confirmPassword: generalFields.confirmPassword.required(),
    role: generalFields.role,
    phone: generalFields.phone,
}).required();

export const loginSchema = joi.object({
  email: generalFields.email.required(),
  password: generalFields.password.required(),
}).required();