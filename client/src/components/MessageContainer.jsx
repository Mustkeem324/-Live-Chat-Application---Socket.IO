import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[550px] flex flex-col">
          {/* Header with User Info */}
          <div className="flex gap-4 items-center bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-3 rounded-lg shadow-lg mb-4">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-14 rounded-full overflow-hidden border-2 border-white">
                <img
                  src={selectedUser?.profilePhoto}
                  alt="user-profile"
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Online Status Badge */}
              {isOnline && (
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full shadow-md animate-pulse"></span>
              )}
            </div>

            {/* User Info Section */}
            <div className="flex flex-col flex-1">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">
                  {selectedUser?.fullName}
                </p>
              </div>
              <p className="text-sm text-green-100">
                {isOnline ? "Active Now" : "Offline"}
              </p>
            </div>
          </div>

          {/* Messages Section with Custom Background */}
          <div
            className="flex-1 p-4 overflow-y-auto bg-cover bg-center"
            style={{
              backgroundImage: `url('./image_chat.jpeg')`, // Replace with the correct path
            }}
          >
            <Messages />
          </div>

          {/* Input Section */}
          <SendInput />
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center bg-chat-pattern bg-cover bg-center h-full">
          {/* Icon Section */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 p-4 rounded-full shadow-lg mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M16 10h.01M12 14h.01M12 12c4.418 0 8-1.79 8-4s-3.582-4-8-4-8 1.79-8 4 3.582 4 8 4zm0 0c4.418 0 8-1.79 8-4m-8 4v6"
              />
            </svg>
          </div>

          {/* Heading Section */}
          <h1 className="text-4xl text-black font-bold">
            Hi, {authUser?.fullName}
          </h1>
          <h1 className="text-2xl text-black mt-2">
            Let's start a conversation
          </h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
