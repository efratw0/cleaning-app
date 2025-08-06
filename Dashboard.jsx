import React from "react";

// Apartment rotation order (no login needed)
const APARTMENTS = [
    "Efrat",
    "Hether & Noah",
    "Guli",
    "First Floor Apartment"
];

// Start date of the rotation
const ROTATION_START_DATE = new Date("2025-08-01");

function getNextCleaningDate(apartment) {
    // Find which turn in the cycle is for this apartment
    let idx = APARTMENTS.indexOf(apartment);
    if (idx === -1) idx = 0;
    // How many rotations have happened since ROTATION_START_DATE?
    const today = new Date();
    const msPerTurn = 14 * 24 * 60 * 60 * 1000; // 2 weeks
    const elapsed = today - ROTATION_START_DATE;
    const turnsSinceStart = Math.floor(elapsed / msPerTurn);
    // Next turn for this apartment after today:
    let nextTurn = idx - (turnsSinceStart % APARTMENTS.length);
    if (nextTurn <= 0) nextTurn += APARTMENTS.length;
    const nextDate = new Date(ROTATION_START_DATE.getTime() + msPerTurn * (turnsSinceStart + nextTurn));
    return nextDate;
}

function getColor(days) {
    if (days <= 2) return "bg-red-200 border-red-400";
    if (days <= 7) return "bg-yellow-200 border-yellow-400";
    return "bg-green-200 border-green-400";
}

export default function CleaningDashboard({ selectedApartment, onGoBack }) {
    const nextDate = getNextCleaningDate(selectedApartment);
    const daysLeft = Math.ceil((nextDate - new Date()) / (1000 * 60 * 60 * 24));
    const colorClass = getColor(daysLeft);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 transition-all">
            <div className={`rounded-3xl shadow-xl p-8 w-full max-w-md bg-white bg-opacity-90 text-center border-4 ${colorClass}`}>
                <button
                    onClick={onGoBack}
                    className="mb-4 text-xs text-gray-500 hover:underline"
                >← Change apartment</button>
                <h2 className="text-xl font-bold text-purple-700 mb-2">
                    Hi, {selectedApartment}!
                </h2>
                <p className="mb-4 text-gray-700">
                    <span className="font-semibold">Next cleaning in</span>
                    <span className="text-2xl mx-2">{daysLeft} days</span>
                </p>
                <div className="mb-2">
                    <span className="font-semibold">Your next turn:</span>
                    <div className="text-lg text-gray-800 mt-1">
                        {nextDate.toLocaleDateString("en-GB", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
                    </div>
                </div>
                <div className="mt-6">
                    {daysLeft <= 2 && (
                        <span className="inline-block px-3 py-1 rounded-full bg-red-300 text-red-900 font-bold">🔴 Very soon!</span>
                    )}
                    {daysLeft > 2 && daysLeft <= 7 && (
                        <span className="inline-block px-3 py-1 rounded-full bg-yellow-300 text-yellow-900 font-bold">🟡 Coming up!</span>
                    )}
                    {daysLeft > 7 && (
                        <span className="inline-block px-3 py-1 rounded-full bg-green-300 text-green-900 font-bold">🟢 You have time!</span>
                    )}
                </div>
            </div>
        </div>
    );
}
