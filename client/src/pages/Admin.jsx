import React, { useState, useEffect } from "react";

export default function Admin() {
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    img: "",
    description: "",
    ingredients: "",
    preparation: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

const API_URL = "https://recipenest-api-fs0m.onrender.com/api/recipes";

  // ✅ Fetch all recipes
  const fetchRecipes = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.error("Error fetching recipes:", err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // ✅ Add / Update Recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category) {
      alert("Name and Category are required!");
      return;
    }

    setLoading(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      // convert ingredients string → array
      const recipeData = {
        ...form,
        ingredients: form.ingredients
          ? form.ingredients.split(",").map((i) => i.trim())
          : [],
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeData),
      });

      if (!res.ok) throw new Error("Failed to save recipe");

      await fetchRecipes();
      alert(editingId ? "✅ Recipe updated!" : "✅ Recipe added!");

      setForm({
        name: "",
        category: "",
        img: "",
        description: "",
        ingredients: "",
        preparation: "",
      });
      setEditingId(null);
    } catch (err) {
      console.error("Error saving recipe:", err);
      alert("❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit Recipe
  const handleEdit = (item) => {
    setForm({
      ...item,
      ingredients: item.ingredients?.join(", ") || "",
    });
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete Recipe
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this dish?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchRecipes();
    } catch (err) {
      console.error("Error deleting recipe:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfefe] via-[#e7f8f9] to-[#fce4ec] p-6 fade-in">
      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-[#b6e4e9]">
        <h1 className="text-3xl font-extrabold text-[#01869E] mb-8 text-center tracking-wide">
          🍳 RecipeNest Admin Panel
        </h1>

        {/* ---------- Add / Edit Form ---------- */}
        <form
          onSubmit={handleSubmit}
          className="grid sm:grid-cols-2 gap-6 border-b border-[#d8e5e7] pb-6 mb-8"
        >
          {/* Name */}
          <div>
            <label className="block text-[#0f2a33] mb-1 font-medium">
              Dish Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-[#cce8ec] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#01869E] outline-none"
              placeholder="Masala Dosa"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-[#0f2a33] mb-1 font-medium">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-[#cce8ec] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#01869E] outline-none"
            >
              <option value="">Select Category</option>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snacks</option>
            </select>
          </div>

          {/* Image */}
          <div className="sm:col-span-2">
            <label className="block text-[#0f2a33] mb-1 font-medium">
              Image URL
            </label>
            <input
              type="url"
              value={form.img}
              onChange={(e) => setForm({ ...form, img: e.target.value })}
              className="w-full border border-[#cce8ec] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#01869E] outline-none"
              placeholder="https://example.com/dish.jpg"
            />
            {form.img && (
              <img
                src={form.img}
                alt="Preview"
                className="w-32 h-32 object-cover mt-3 rounded-lg shadow-md border border-[#b6e4e9]"
                onError={(e) =>
                  (e.target.src =
                    'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg')
                }
              />
            )}
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className="block text-[#0f2a33] mb-1 font-medium">
              Description
            </label>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border border-[#cce8ec] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#01869E] outline-none resize-none"
              placeholder="Spicy and crispy dosa with masala filling."
            ></textarea>
          </div>

          {/* Ingredients */}
          <div className="sm:col-span-2">
            <label className="block text-[#0f2a33] mb-1 font-medium">
              Ingredients (comma separated)
            </label>
            <textarea
              rows={2}
              value={form.ingredients}
              onChange={(e) =>
                setForm({ ...form, ingredients: e.target.value })
              }
              className="w-full border border-[#cce8ec] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#01869E] outline-none resize-none"
              placeholder="Rice, Potato, Onion, Mustard seeds, Oil..."
            ></textarea>
          </div>

          {/* Preparation */}
          <div className="sm:col-span-2">
            <label className="block text-[#0f2a33] mb-1 font-medium">
              Preparation Steps
            </label>
            <textarea
              rows={4}
              value={form.preparation}
              onChange={(e) =>
                setForm({ ...form, preparation: e.target.value })
              }
              className="w-full border border-[#cce8ec] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#01869E] outline-none resize-none"
              placeholder="1. Soak rice and dal...\n2. Grind and ferment...\n3. Pour batter and make dosa..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 text-right">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#01869E] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-[#026877] transition disabled:opacity-60"
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Recipe ✏️"
                : "Add Recipe ➕"}
            </button>
          </div>
        </form>

        {/* ---------- Recipe List ---------- */}
        <h2 className="text-2xl font-semibold text-[#01869E] mb-4">
          All Recipes ({recipes.length})
        </h2>

        {recipes.length === 0 ? (
          <p className="text-gray-500 text-center py-10">
            No recipes added yet 😅
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recipes.map((r) => (
              <div
                key={r._id}
                className="bg-white border border-[#cce8ec] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <img
                  src={
                    r.img ||
                    'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
                  }
                  alt={r.name}
                  className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#01869E]">
                    {r.name}
                  </h3>
                  <p className="text-sm text-gray-500 italic">{r.category}</p>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed line-clamp-2">
                    {r.description}
                  </p>
                </div>

                <div className="flex justify-between px-4 pb-4">
                  <button
                    onClick={() => handleEdit(r)}
                    className="text-sm bg-[#ffcc70] hover:bg-[#ffb347] text-white px-3 py-1 rounded-lg font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="text-sm bg-[#ff7b7b] hover:bg-[#e46060] text-white px-3 py-1 rounded-lg font-medium"
                  >
                    Delete
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
