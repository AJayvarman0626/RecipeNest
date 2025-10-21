import React, { useEffect, useState } from "react";

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setTimeout(() => setFadeIn(true), 200);

    // Fake loading progress
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => onFinish(), 600);
          return 100;
        }
        return p + 3.5;
      });
    }, 70);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center 
      bg-gradient-to-br from-[#e0f7f9] via-[#fdfefe] to-[#fce4ec] 
      text-[#01869E] z-[9999] fade-in">

      {/* Chef Image Animation */}
      <img
        src="/Loading.png" // 👈 make sure it's in your public folder
        alt="Cooking Animation"
        className={`w-40 sm:w-52 md:w-64 mb-6 transition-all duration-1000 ${
          fadeIn ? "opacity-100 scale-105 bounce-slow" : "opacity-0 scale-90"
        }`}
      />

      {/* App Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide mb-4 animate-pulse drop-shadow-lg">
        RecipeNest 🍳
      </h1>

      {/* Progress Bar */}
      <div className="w-60 h-3 bg-white/80 rounded-full shadow-inner overflow-hidden border border-[#b6e4e9]">
        <div
          className="h-full bg-[#01869E] transition-all duration-300 shadow-[0_0_8px_#56cfe1]"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Loading Subtext */}
      <p className="mt-5 text-sm sm:text-base text-[#026877] font-medium animate-fadeIn">
        {progress < 100
          ? "Cooking up your experience..."
          : "Ready to serve! 🍽️"}
      </p>
    </div>
  );
}
