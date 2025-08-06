import React, { useState, useEffect } from "react";
import WelcomeCard from "./WelcomeCard";
import CleaningDashboard from "./Dashboard";

export default function App() {
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedApartment = localStorage.getItem('selectedApartment');
        if (storedApartment) {
            setSelectedApartment(storedApartment);
        }
        setIsLoading(false);
    }, []);

    const handleSelectApartment = (apartmentName) => {
        localStorage.setItem('selectedApartment', apartmentName);
        setSelectedApartment(apartmentName);
    };

    const handleGoBack = () => {
        localStorage.removeItem('selectedApartment');
        setSelectedApartment(null);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your cleaning schedule...</p>
                </div>
            </div>
        );
    }

    if (!selectedApartment) {
        return <WelcomeCard onSelectApartment={handleSelectApartment} />;
    }

    return (
        <CleaningDashboard 
            selectedApartment={selectedApartment}
            onGoBack={handleGoBack}
        />
    );
}