import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch("https://recipenest-api-fs0m.onrender.com/api/recipes")  
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-[#01869E] text-lg font-semibold animate-pulse">
        🍳 Cooking your recipe...
      </div>
    );

  if (!recipe)
    return (
      <div className="text-center mt-20 text-gray-500">
        Recipe not found 😕
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfefe] via-[#e7f8f9] to-[#fce4ec] py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 border border-[#b6e4e9] animate-fadeIn">
        {/* ---------- Recipe Header ---------- */}
        <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
          <div className="flex-1">
            <img
              src={
                recipe.img ||
                "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
              }
              alt={recipe.name}
              className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-[1.03] transition-all duration-500"
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#01869E] mb-3 drop-shadow-sm">
              {recipe.name}
            </h1>
            <p className="text-gray-600 italic text-lg mb-2">
              Category: {recipe.category}
            </p>
            <p className="text-gray-700">{recipe.description}</p>
          </div>
        </div>

        {/* ---------- Ingredients Section ---------- */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-[#ff6b9d] mb-3">
            🧂 Ingredients
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1 bg-[#e7f8f9]/60 p-4 rounded-xl border border-[#b6e4e9] shadow-sm">
            {recipe.ingredients?.length ? (
              recipe.ingredients.map((item, index) => (
                <li
                  key={index}
                  className="transition-transform duration-200 hover:translate-x-1"
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No ingredients listed</li>
            )}
          </ul>
        </div>

        {/* ---------- Preparation Section ---------- */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-[#ff6b9d] mb-3">
            🍳 Preparation Steps
          </h2>
          <div className="text-gray-700 whitespace-pre-line leading-relaxed bg-[#fff1f7]/70 p-4 rounded-xl border border-[#f6d7e2] shadow-sm">
            {recipe.preparation || "No preparation steps provided yet."}
          </div>
        </div>

        {/* ---------- Back Button ---------- */}
        <div className="text-center mt-12">
          <Link
            to="/explore"
            className="inline-block bg-[#01869E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#026877] hover:scale-105 transition-all duration-300 shadow-md"
          >
            ← Back to Explore
          </Link>
        </div>
      </div>
    </div>
  );
}
