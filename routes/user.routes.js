import express from "express";
import {
  createUser,
  loginUser,
  authUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { Users } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();
router.post("/signup", createUser);

router.post("/login", loginUser);

router.post("/auth", authUser);

router.post("/logout", logoutUser);

router.post("/forget-password", async (req, res) => {
  const { username } = req.body;
  try {
    const user = Users.findOne({ username });
    if (!user) return res.status(403).send({ message: "User not found" });
    const token = jwt.sign(
      { _id: user._id, name: username },
      process.env.SECRET,
      {
        expiresIn: "10m",
      }
    );
  } catch (error) {}
});

export default router;
