import express from "express";
import { Recipes } from "../models/recipe.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const recipes = await Recipes.find();
  res.status(200).send(recipes);
});

router.post("/", async (req, res) => {
  const data = req.body;
  try {
    const recipe = new Recipes(data);
    const addedRecipe = await recipe.save();
    res.status(201).send(addedRecipe);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipes.findById(id);
    res.status(200).send(recipe);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipeDeleted = await Recipes.findByIdAndDelete(id);
    res.status(200).send(recipeDeleted);
  } catch (error) {
    res.status(200).send(error);
  }
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = req.body;
    const recipeUpdate = await Recipes.findByIdAndUpdate(id, { ...data });
    res.status(201).send(recipeUpdate);
  } catch (error) {
    res.status(404).send(error);
  }
});

export default router;
