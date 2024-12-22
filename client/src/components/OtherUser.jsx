import React from 'react'
import { useDispatch,useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const {selectedUser, onlineUsers} = useSelector(store=>store.user);
    const isOnline = onlineUsers?.includes(user._id);
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }
    return (
        <>
            {/* User Card */}
            <div
                onClick={() => selectedUserHandler(user)}
                className={`${
                    selectedUser?._id === user?._id
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'text-gray-300'
                } flex gap-3 items-center hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:text-white rounded-lg p-3 cursor-pointer transition-all duration-300`}
            >
                {/* Avatar */}
                <div className="relative">
                    <div className="w-12 rounded-full overflow-hidden">
                        <img
                            src={user?.profilePhoto}
                            alt="user-profile"
                            className="object-cover w-full h-full"
                        />
                    </div>
                    {isOnline && (
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full shadow-md animate-pulse"></span>
                    )}
                </div>
    
                {/* User Details */}
                <div className="flex flex-col flex-1">
                    <p className="text-sm font-medium">{user?.fullName}</p>
                    <p className="text-xs text-gray-400">Last seen 5 mins ago</p>
                </div>
            </div>
    
            {/* Divider */}
            <div className="border-t border-gray-500 mx-2"></div>
        </>
    );
    
}

export default OtherUser