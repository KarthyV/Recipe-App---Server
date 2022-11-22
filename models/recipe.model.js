import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    recipeName: {
      type: String,
      required: [true, "Recipe Name is required"],
    },
    recipePoster: {
      type: String,
      required: true,
    },
    cookingTime: {
      type: Number,
      min: 5,
      required: true,
    },
    step: {
      type: [String],
    },
    ingName: {
      type: String,
      required: true,
    },
    ingQty: {
      type: Number,
      required: true,
    },
    recipeType: { type: String, required: true },
  },
  { timestamps: true }
);

export const Recipes = mongoose.model("Recipe", recipeSchema);
