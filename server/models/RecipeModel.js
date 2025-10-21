import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  img: { type: String },
  description: { type: String },
  ingredients: { type: [String], default: [] },
  preparation: { type: String, default: "" },
});

export default mongoose.model("Recipe", recipeSchema);
