import { Router } from "express";
import * as authService from "./auth.service.js"
import { asyncHandler } from "../../utils/Error handling/asyncHandler.js"
import { validation } from "../../middlewares/validation.middleware.js"
import * as authValidation from "../Auth/auth.validation.js"
const router = Router();

router.post("/register", 
    validation(authValidation.registerSchema), 
    asyncHandler(authService.register)
);

router.post("/login", 
    validation(authValidation.loginSchema),
    asyncHandler(authService.login)
);

router.get("/activateAcc/:token", 
    asyncHandler(authService.activateAccount)
);

export default router;