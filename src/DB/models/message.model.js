import mongoose, {Schema} from "mongoose";
import { Types } from "mongoose";

const messageSchema = new  Schema(
    {
        //msg body
        content:{
            type: String,
            required: true,
        },
        sender:{
            type: Types.ObjectId,
            ref: "User",
        },
        receiver:{
            type: Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true,
    }
);

const messageModel = mongoose.model("Message", messageSchema);
export default messageModel;