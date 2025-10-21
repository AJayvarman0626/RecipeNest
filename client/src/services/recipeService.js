import axios from "axios";

const API_URL = "http://localhost:5000/api/recipes";

// Get all recipes
export const getRecipes = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Add a new recipe
export const addRecipe = async (recipeData) => {
  const res = await axios.post(API_URL, recipeData);
  return res.data;
};

// Delete recipe
export const deleteRecipe = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
