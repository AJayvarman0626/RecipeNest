import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");

  // Load user & favorites
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
      return;
    }

    setUser(userData);
    setEditedName(userData.name);

    const allFavs = JSON.parse(localStorage.getItem("favorites")) || {};
    const userFavs = allFavs[userData.email] || [];
    setFavorites(userFavs);
  }, [navigate]);

  // Logout user
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Handle name edit toggle
  const handleEditToggle = () => {
    if (isEditing && editedName.trim()) {
      const updatedUser = { ...user, name: editedName };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
    setIsEditing(!isEditing);
  };

  // Remove favorite
  const removeFavorite = (id) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);

    const allFavs = JSON.parse(localStorage.getItem("favorites")) || {};
    allFavs[user.email] = updated;
    localStorage.setItem("favorites", JSON.stringify(allFavs));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfefe] via-[#e7f8f9] to-[#fce4ec] p-6 fade-in">
      <div className="max-w-5xl mx-auto bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-[#cce8ec]">
        {/* ---------- Profile Header ---------- */}
        <div className="flex flex-wrap items-center gap-6 mb-10">
          <img
            src={`https://ui-avatars.com/api/?name=${editedName}&background=01869E&color=fff`}
            alt="avatar"
            className="w-24 h-24 rounded-full shadow-md border-4 border-[#b6e4e9] transition-all duration-300"
          />

          <div className="flex flex-col">
            {isEditing ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="text-2xl font-bold text-[#01869E] border-b-2 border-[#01869E] bg-transparent outline-none focus:ring-0 w-fit transition-all duration-300"
                autoFocus
              />
            ) : (
              <h2 className="text-2xl font-bold text-[#01869E]">
                {user.name}
              </h2>
            )}

            <p className="text-gray-600">{user.email}</p>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                user.role === "admin"
                  ? "bg-[#ffe4e1] text-[#e14d4d]"
                  : "bg-[#e0f7f9] text-[#01869E]"
              }`}
            >
              {user.role.toUpperCase()}
            </span>

            <button
              onClick={handleEditToggle}
              className={`mt-3 text-sm font-medium px-4 py-1.5 rounded-full shadow-md transition-all duration-300 ${
                isEditing
                  ? "bg-[#01869E] text-white hover:bg-[#026877]"
                  : "bg-[#ff7b9d] text-white hover:bg-[#e45c8a]"
              }`}
            >
              {isEditing ? "💾 Save" : "✏️ Edit Name"}
            </button>
          </div>

          <div className="ml-auto">
            <button
              onClick={handleLogout}
              className="bg-[#ff7b7b] text-white px-5 py-2 rounded-lg hover:bg-[#e46060] transition font-medium shadow-md"
            >
              Logout
            </button>
          </div>
        </div>

        {/* ---------- Favorites Section ---------- */}
        <h3 className="text-2xl font-semibold text-[#01869E] mb-6 text-center">
          💖 Your Favorite Recipes
        </h3>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              You haven’t saved any favorites yet 😅
            </p>
            <button
              onClick={() => navigate("/explore")}
              className="mt-4 bg-[#01869E] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#026877] transition shadow-md"
            >
              Explore Recipes →
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#cce8ec] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <img
                  src={
                    item.img ||
                    "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                  }
                  alt={item.name}
                  className="h-44 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold text-[#01869E]">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500 italic mt-1">
                    {item.category}
                  </p>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                  <button
                    onClick={() => removeFavorite(item.id)}
                    className="mt-4 bg-[#ff7b7b] text-white text-sm px-4 py-1.5 rounded-full font-medium hover:bg-[#e46060] transition-all duration-300"
                  >
                    Remove ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
