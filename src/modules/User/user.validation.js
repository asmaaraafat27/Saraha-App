import joi from "joi";
import { generalFields } from "../../middlewares/validation.middleware.js"

export const updateProfileSchema = joi.object({
    userName: generalFields.userName,
    email: generalFields.email,
    phone: generalFields.phone,
}).required();