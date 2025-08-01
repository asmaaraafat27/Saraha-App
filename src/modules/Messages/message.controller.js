import { Router } from "express";
import * as messageService from "./message.service.js";
import { asyncHandler } from "../../utils/Error handling/asyncHandler.js"
import { authentication, allowto } from "../../middlewares/Auth.middleware.js";
import { validation } from "../../middlewares/validation.middleware.js";
import * as messageValidation from "./message.validation.js";

const router = Router();

router.post("/",
    authentication,
    validation(messageValidation.sendMessageSchema), 
    allowto(["User"]), asyncHandler(messageService.sendMessage
));

router.get("/:messageId", 
    authentication, 
    validation(messageValidation.getSingleMessageSchema),
    allowto(["User"]), asyncHandler(messageService.getSingleMessage
));

router.get("/", 
    authentication,
    validation(messageValidation.getAllMessagesSchema), 
    allowto(["User"]), asyncHandler(messageService.getAllMessages
));

router.delete("/:messageId", 
    authentication,
    validation(messageValidation.deleteMessagesSchema), 
    allowto(["User"]), asyncHandler(messageService.deleteMessage
));

router.patch("/:messageId", 
    authentication, 
    validation(messageValidation.updateMessagesSchema),
    allowto(["User"]), asyncHandler(messageService.updateMessage
));

export default router;
