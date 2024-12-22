import React, {useState } from 'react'
import { IoSend } from "react-icons/io5";
import axios from "axios";
import {useDispatch,useSelector} from "react-redux";
import { setMessages } from '../redux/messageSlice';
import { BASE_URL } from '..';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store=>store.user);
    const {messages} = useSelector(store=>store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, {message}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            dispatch(setMessages([...messages, res?.data?.newMessage]))
        } catch (error) {
            console.log(error);
        } 
        setMessage("");
    }
    return (
        <form onSubmit={onSubmitHandler} className="px-4 my-3">
            <div className="w-full relative">
                {/* Input Field */}
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="💬 Type your message here..."
                    className="border text-sm rounded-full block w-full p-3 pl-5 bg-gradient-to-r from-gray-700 to-gray-600 text-white border-zinc-500 focus:ring-4 focus:ring-green-400 focus:outline-none transition-all duration-300 shadow-md"
                />
                {/* Submit Button */}
                <button
                    type="submit"
                    className="absolute flex inset-y-0 end-0 items-center justify-center p-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg transition-transform duration-300 transform hover:scale-110 hover:rotate-3 active:scale-95"
                    aria-label="Send"
                >
                    <IoSend size={22} />
                </button>
            </div>
        </form>
    );
}

export default SendInput