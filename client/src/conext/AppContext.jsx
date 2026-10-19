import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useUser, useAuth} from "@clerk/clerk-react"
import {toast} from 'react-hot-toast'
import { useEffect } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate();
    const { user } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false)
    const [searchedCities, setSearchedCities] = useState([])
    const [rooms, setRooms] = useState([])

    const [apiLoading, setApiLoading] = useState(false);

useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
        (config) => {
            setApiLoading(true); 
            return config;
        },
        (error) => {
            setApiLoading(false);
            return Promise.reject(error);
        }
    );

    // 3. Response Interceptor: Deactivates when ANY API request completes or crashes
    const responseInterceptor = axios.interceptors.response.use(
        (response) => {
            setApiLoading(false); 
            return response;
        },
        (error) => {
            setApiLoading(false); 
            return Promise.reject(error);
        }
    );

    // Clean up connections on unmount to save performance memory
    return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
    };
}, []);


    const fetchRooms = async () => {
        try {
            const { data } = await axios.get('/api/rooms')
            if (data.success) {
                setRooms(data.rooms)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUser = async () => {
        try {
            const {data} = await axios.get('/api/user', {headers: {Authorization: `Bearer ${await getToken()}`}})

            if (data.success) {
                setIsOwner(data.role === "hotelOwner");
                // Normalize data: ensure it maps into an array of clean strings
                const citiesData = data.recentSearchedCities || [];
                const sanitizedCities = citiesData.map(item => 
                    typeof item === 'object' && item !== null ? item.recentSearchedCity : item
                );
                
                setSearchedCities(sanitizedCities);
            } else {
                // Retry Fetching user after 5 seconds
                setTimeout(()=> {
                    fetchUser()
                }, 5000)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=> {
        if (user) {
            fetchUser();
        }
    }, [user])

    useEffect(()=> {
        fetchRooms();
    }, [])

    const value = {
        currency, navigate, user, getToken, isOwner, setIsOwner, axios, showHotelReg, setShowHotelReg, searchedCities, setSearchedCities, rooms, setRooms, apiLoading
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> useContext(AppContext);