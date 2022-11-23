import express from "express";
import {
  createUser,
  loginUser,
  authUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { Users } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { authorizePasswordChange } from "../middlewares/auth.js";
import bcrypt from "bcrypt";
import { Sessions } from "../models/session.model.js";

const router = express.Router();
router.post("/signup", createUser);

router.post("/login", loginUser);

router.post("/auth", authUser);

router.post("/logout", logoutUser);

async function nodeMailer(email, token) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.EMAIL_TEST,
      pass: process.env.EMAIL_TEST_APP_PSWD,
    },
  });
  let info = await transporter.sendMail({
    from: '"Karthy V 👻" <karthickv@tolemy.io>', // sender address
    to: `${email}, karthickv@tolemy.io`, // list of receivers
    subject: "Change Password Request", // Subject line
    text: `Copy and Paste this link in browser - ${token}`, // plain text body
    html: `<b>Copy and Paste this link in browser within 10mins - <mark>${token}</mark></b>`, // html body
  });
  console.log("Message sent: %s", info.messageId);
}
router.post("/forget-password", async (req, res) => {
  console.log(req.body);
  const { username, email } = req.body;
  try {
    const user = await Users.findOne({ username });
    if (!user) return res.status(403).send({ message: "User not found" });
    const token = jwt.sign(
      { _id: user._id, name: username },
      process.env.SECRET,
      {
        expiresIn: "10m",
      }
    );
    await nodeMailer(email, token);
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/verify-token", async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken);
    res.status(200).send({ message: "Verified" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post(
  "/change-password/:id",
  authorizePasswordChange,
  async (req, res) => {
    const { password } = req.body;
    const { id } = req.params;
    console.log(req.body);
    try {
      await bcrypt.hash(password, 10, async (err, hashedPassword) => {
        const user = await Users.findByIdAndUpdate(id, {
          password: hashedPassword,
        });
        console.log(user);
        const token = jwt.sign(
          { _id: user._id + Date.now() },
          process.env.SECRET
        );
        const sessionData = new Sessions({ userId: user._id, token });
        await user.save();
        await sessionData.save();
        res.status(200).send(sessionData);
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

export default router;
