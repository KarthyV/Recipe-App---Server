import express from "express";
import {
  createUser,
  loginUser,
  authUser,
  logoutUser,
} from "../controllers/user.controller.js";

const router = express.Router();
router.post("/signup", createUser);

router.post("/login", loginUser);

router.post("/auth", authUser);

router.post("/logout", logoutUser);

export default router;
