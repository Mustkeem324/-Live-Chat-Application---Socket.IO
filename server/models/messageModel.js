import mongoose from "mongoose";

const messageModel = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        sentAt: {
            type: Date,
            default: Date.now, // Automatically sets the time when the message is sent
        },
        readAt: {
            type: Date, // To be updated when the receiver reads the message
        },
    },
    { timestamps: true } // Still includes createdAt and updatedAt for the overall document
);

export const Message = mongoose.model("Message", messageModel);
