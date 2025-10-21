import React from "react";
import { Link } from "react-router-dom"; // 👈 Import this!

export default function RecipeCard({ recipe = {}, onFavorite = () => {} }) {
  const {
    _id, // MongoDB id
    name = "Unnamed Dish",
    category = "Uncategorized",
    img = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
    description = "No description available.",
  } = recipe || {};

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group">
      {/* 🔗 Wrap the clickable area with Link */}
      <Link to={`/recipe/${_id}`} className="block">
        <img
          src={img}
          alt={name}
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) =>
            (e.target.src =
              "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg")
          }
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 group-hover:text-[#01869E] transition-colors">
            {name}
          </h2>
          <p className="text-gray-500 text-sm mt-1">{category}</p>
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {description}
          </p>
        </div>
      </Link>

      {/* ❤️ Favorite button stays clickable outside the Link */}
      <div className="px-4 pb-4">
        <button
          onClick={() => onFavorite(recipe)}
          className="w-full bg-[#ff6b9d] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#e45c8a] transition-all duration-300 font-medium"
        >
          ❤️ Add to Favorites
        </button>
      </div>
    </div>
  );
}
