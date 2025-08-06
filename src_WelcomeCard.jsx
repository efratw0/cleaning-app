import React from "react";

const APARTMENTS = [
    "Efrat",
    "Hether & Noah",
    "Guli",
    "First Floor Apartment"
];

export default function WelcomeCard({ onSelectApartment }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-orange-100 to-purple-100">
            <div className="rounded-3xl shadow-lg p-8 bg-white bg-opacity-80 w-full max-w-sm text-center">
                <h1 className="text-2xl font-bold mb-4 text-purple-700">Welcome!</h1>
                <p className="mb-6 text-gray-700">Who are you?</p>
                <div className="flex flex-col gap-4">
                    {APARTMENTS.map(name => (
                        <button
                            key={name}
                            onClick={() => onSelectApartment(name)}
                            className="py-3 rounded-2xl bg-gradient-to-r from-pink-200 via-orange-200 to-purple-200 hover:scale-105 transition font-semibold text-gray-800 shadow"
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}