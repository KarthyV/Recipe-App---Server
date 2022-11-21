import express from "express";
import {
  createUser,
  loginUser,
  authUser,
} from "../controllers/user.controller.js";

const router = express.Router();
router.post("/signup", createUser);

router.post("/login", loginUser);

router.post("/auth", authUser);

export default router;
