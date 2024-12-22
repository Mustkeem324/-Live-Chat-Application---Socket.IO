import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';
 
const Sidebar = () => {
    const [search, setSearch] = useState("");
    const {otherUsers} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    }
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]));
        }else{
            toast.error("User not found!");
        }
    }
    return (
        <div className="border-r border-gray-600 p-6 flex flex-col h-full bg-gray-800">
            {/* Search Form */}
            <form onSubmit={searchSubmitHandler} className="flex items-center gap-3 mb-4">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
                />
                <button
                    type="submit"
                    className="flex items-center justify-center p-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-all duration-300"
                >
                    <BiSearchAlt2 className="w-6 h-6" />
                </button>
            </form>
    
            {/* Divider */}
            <div className="border-t border-gray-500 my-2"></div>
    
            {/* Other Users Section */}
            <div className="flex-1 overflow-y-auto">
                <OtherUsers />
            </div>
    
            {/* Logout Button */}
            <div className="mt-4">
                <button
                    onClick={logoutHandler}
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-md shadow hover:bg-green-700 transition-all duration-300"
                >
                    Logout
                </button>
            </div>
        </div>
    );    
}

export default Sidebar