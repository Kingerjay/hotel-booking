import React, { useEffect, useState } from 'react';
import { useAppContext } from '../conext/AppContext'; 

const GlobalSpinner = () => {
    const { apiLoading } = useAppContext();
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        let timeoutId;

        if (apiLoading) {
            setShouldRender(true);
        } else {
            timeoutId = setTimeout(() => {
                setShouldRender(false);
            }, 300);
        }

        return () => clearTimeout(timeoutId);
    }, [apiLoading]);

    // Render configuration binds to the debounced state instead of the raw variable
    if (!shouldRender) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex flex-col items-center justify-center backdrop-blur-sm transition-all duration-300">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"></div>
            
        </div>
    );
};

export default GlobalSpinner;
