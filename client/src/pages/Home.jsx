import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const categories = [
    {
      name: "Breakfast",
      desc: "Start your day with energy-packed dishes ☀️",
      img: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
    },
    {
      name: "Lunch",
      desc: "Tasty, wholesome meals to fuel your afternoon 🍛",
      img: "https://res.cloudinary.com/dbewunqp3/image/upload/v1761040272/ugadi-lunch-menu-scaled_dogdzt.webp",
    },
    {
      name: "Dinner",
      desc: "Relax with cozy, comforting evening dishes 🌙",
      img: "https://res.cloudinary.com/dbewunqp3/image/upload/v1761040352/Crab_Cake_Melt_afqbm1.webp",
    },
    {
      name: "Snacks",
      desc: "Quick bites for every craving 🍿",
      img: "https://res.cloudinary.com/dbewunqp3/image/upload/v1761040397/easy-snack-recipes_uni_fybecz.webp",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7f9] via-[#fdfefe] to-[#fce4ec] text-gray-700 fade-in">
      {/* ---------- Hero Section ---------- */}
      <div className="text-center py-24 px-6">
        <p className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
          Welcome to
        </p>

        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-4">
          <span className="text-[#01869E]">Recipe</span>
          <span className="text-[#ff6b9d]">Nest</span> 🍳
        </h1>

        <p className="text-gray-600 mt-2 text-lg max-w-2xl mx-auto leading-relaxed">
          From Sunrise Breakfasts to Midnight Snacks 🌙
        </p>

        {/* ✨ Pink CTA Button */}
        <Link
          to="/explore"
          className="inline-block mt-8 bg-[#ff6b9d] text-white px-7 py-3 rounded-xl text-lg font-semibold hover:scale-105 hover:bg-[#e45c8a] shadow-md transition-all duration-300"
        >
          Start Exploring →
        </Link>
      </div>

      {/* ---------- Category Grid ---------- */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-[#026877] mb-8 text-center">
          Explore by Category 🍴
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-lg group bg-white/20 backdrop-blur-xl border border-[#b6e4e9]/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-48 object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />

              {/* Glassy Teal Overlay */}
              <div className="absolute inset-0 bg-[]/40 group-hover:bg-[#01869e]/60 transition duration-300 flex flex-col justify-center items-center text-center px-4">
                <h3 className="text-white text-2xl font-bold drop-shadow-md">
                  {cat.name}
                </h3>
                <p className="text-gray-200 text-sm mt-1 drop-shadow-md">
                  {cat.desc}
                </p>
                <Link
                  to="/explore"
                  className="mt-4 bg-white text-[#01869E] font-medium px-4 py-2 rounded-full shadow-md hover:bg-[#01869E] hover:text-white transition-all duration-300"
                >
                  View Recipes →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Footer ---------- */}
      <footer className="bg-[#01869E] text-white py-6 mt-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()}{" "}
          <b className="text-[#ffb3c9]">RecipeNest</b> | Cook • Love • Share 💙
        </p>
      </footer>
    </div>
  );
}
