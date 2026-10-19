import React from 'react';
import { useAppContext } from '../conext/AppContext';

const GlobalSpinner = () => {
    const { apiLoading } = useAppContext();

    if (!apiLoading) return null;

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
            <div className="animate-spin rounded-full h-24 w-24 border-6 border-gray-300 border-t-primary"></div>
            
            
        </div>
    );
};

export default GlobalSpinner;
