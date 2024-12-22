import { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from '..';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/user`);
                console.log("Fetched users -> ", res.data);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchOtherUsers();

        const interval = setInterval(() => {
            fetchOtherUsers();
        }, 10000); 

        return () => clearInterval(interval);
    }, [dispatch]);
};

export default useGetOtherUsers;