import { Router } from "express";
import * as userService from "./user.service.js";
import { authentication, allowto } from "../../middlewares/Auth.middleware.js";
import { asyncHandler } from "../../utils/Error handling/asyncHandler.js";
import * as userValidation from "./user.validation.js"
import { validation } from "../../middlewares/validation.middleware.js";

const router = Router();

router.get("/profile", authentication,
    allowto(["User"]),
    asyncHandler(userService.getUser
)); // this route is allowable for users only

router.patch("/", authentication,
    validation(userValidation.updateProfileSchema),
    allowto(["User", "Admin"]),
    asyncHandler(userService.updateProfile
));

export default router;