import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useAppContext } from '../conext/AppContext'
import { useState } from 'react'
import { useEffect } from 'react'

const RecommendedHotels = () => {

    const {rooms, searchedCities} = useAppContext();
    const [recommended, setRecommended] = useState([]);

    const filterHotels = () => {
        if (!rooms || !searchedCities || searchedCities.length === 0) {
            setRecommended([]);
            return;
        }
    
        // Convert everything safely to clean lowercase strings
        const normalizedCities = searchedCities.map(city => 
            String(city).toLowerCase().trim()
        );
    
        const filteredHotels = rooms.filter(room => {
            const roomCity = room?.hotel?.city?.toLowerCase().trim();
            return roomCity && normalizedCities.includes(roomCity);
        });
    
        setRecommended(filteredHotels);
    }
    

    useEffect(()=> {
        filterHotels()
    }, [rooms, searchedCities])

    
  return recommended.length > 0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-10'>

        <Title 
        title="Recommended Hotels"
        subTitle="Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences"
        />

        <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
            {recommended.slice(0,3).map((room, index)=> (
                <HotelCard key={room._id}
                room={room}
                index={index}
                />
            ))}
        </div>

    </div>
  )
}

export default RecommendedHotels