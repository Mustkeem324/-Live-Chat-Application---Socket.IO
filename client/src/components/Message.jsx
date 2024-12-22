import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import moment from 'moment'; // Import moment.js for date formatting

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    // Format the message's sent time using moment.js
    const formattedTime = message?.sentAt
        ? moment(message.sentAt).format('hh:mm A') // Example: 12:45 PM
        : "Time not available";

    return (
        <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Profile"
                        src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto}
                    />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-white">{formattedTime}</time>
            </div>
            <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : ''}`}>
                {message?.message}
            </div>
        </div>
    );
};

export default Message;