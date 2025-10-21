import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Explore() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://recipenest-api-fs0m.onrender.com"; // make sure backend is running

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error loading recipes:", error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const addToFavorites = (recipe) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to save favorites ❤️");
      return;
    }

    const allFavs = JSON.parse(localStorage.getItem("favorites")) || {};
    const userFavs = allFavs[user.email] || [];

    if (userFavs.some((f) => f._id === recipe._id)) {
      alert("Already added to favorites ❤️");
      return;
    }

    const updatedFavs = [...userFavs, recipe];
    allFavs[user.email] = updatedFavs;
    localStorage.setItem("favorites", JSON.stringify(allFavs));

    alert("Added to favorites 💙");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-[#01869E] text-lg font-semibold animate-pulse">
        🍳 Loading recipes...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfefe] via-[#e7f8f9] to-[#fce4ec] p-8 fade-in">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#01869E] mb-6 text-center">
          Explore Delicious Dishes 🍽️
        </h1>

        {recipes.length === 0 ? (
          <div className="text-center mt-16">
            <p className="text-gray-600 text-lg">
              No dishes added yet 😅 <br />
              <span className="text-[#01869E] font-medium">
                (Ask admin to add some!)
              </span>
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
            {recipes.map((recipe) => (
              <Link
                key={recipe._id}
                to={`/recipe/${recipe._id}`}
                className="bg-white border border-[#cce8ec] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={
                      recipe.img ||
                      "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                    }
                    alt={recipe.name}
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5 text-center">
                  <h3 className="text-xl font-semibold text-[#01869E] mb-1">
                    {recipe.name}
                  </h3>
                  <p className="text-sm text-gray-500 italic mb-2">
                    {recipe.category}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {recipe.description || "No description available."}
                  </p>

                  <button
                    onClick={(e) => {
                      e.preventDefault(); // stop the Link navigation
                      e.stopPropagation();
                      addToFavorites(recipe);
                    }}
                    className="mt-4 bg-[#01869E] text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-[#026877] hover:scale-105 transition-all duration-300"
                  >
                    💖 Add to Favorites
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
