import express from "express";
import {
  AddRecipe,
  deleteRecipeById,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
} from "../controllers/recipe.controller.js";

const router = express.Router();

router.get("/", getAllRecipes);

router.post("/", AddRecipe);

router.get("/:id", getRecipeById);

router.delete("/:id", deleteRecipeById);

router.patch("/:id", updateRecipeById);

export default router;
