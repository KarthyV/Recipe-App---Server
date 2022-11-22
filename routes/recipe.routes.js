import express from "express";
import {
  AddRecipe,
  deleteRecipeById,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
} from "../controllers/recipe.controller.js";
import { authorizeUser, authorizeAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAllRecipes);

router.post("/", authorizeAdmin, AddRecipe);

router.get("/:id", getRecipeById);

router.delete("/:id", authorizeAdmin, deleteRecipeById);

router.patch("/:id", authorizeUser, updateRecipeById);

export default router;
