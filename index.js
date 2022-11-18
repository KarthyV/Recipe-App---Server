import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import recipeRoutes from "./routes/recipe.routes.js";

dotenv.config();
const app = express();

app.use(express.json()); // middleware for converting data to JSON

await mongoose.connect(process.env.MONGO_URL);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use("/recipes", recipeRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
