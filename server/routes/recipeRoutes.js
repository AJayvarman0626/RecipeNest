import express from "express";
import Recipe from "../models/recipeModel.js";

const router = express.Router();

// ✅ Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching recipes" });
  }
});

// ✅ Get single recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.json(recipe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching recipe" });
  }
});

// ✅ Add new recipe
router.post("/", async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    const saved = await recipe.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Error adding recipe" });
  }
});

// ✅ Update recipe
router.put("/:id", async (req, res) => {
  try {
    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // 👈 return the updated recipe
    });
    if (!updated)
      return res.status(404).json({ message: "Recipe not found to update" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating recipe" });
  }
});

// ✅ Delete recipe
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Recipe not found to delete" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting recipe" });
  }
});

export default router;
