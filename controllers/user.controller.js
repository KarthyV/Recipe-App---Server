import { Sessions } from "../models/session.model.js";
import { Users } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createUser = (req, res) => {
  const { username, password, role } = req.body;

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    const userData = { username, password: hashedPassword, role };
    const user = new Users(userData);
    const token = jwt.sign({ _id: user._id + Date.now() }, process.env.SECRET);
    const sessionData = new Sessions({ userId: user._id, token });
    await user.save();
    await sessionData.save();
    res.status(201).send(sessionData);
  });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ username: username });
  if (!user) return res.status(401).send({ message: "Invalid Credentials" });
  bcrypt.compare(password, user.password, async (err, result) => {
    if (err) res.status(401).send({ message: "Invalid Credentials" }); // NOTE: For not found user, use status code 401
    if (result) {
      const token = jwt.sign({ _id: user.id + Date.now() }, process.env.SECRET);
      const sessionData = new Sessions({ userId: user._id, token });
      await user.save();
      await sessionData.save();
      res.status(200).send(sessionData);
    }
  });
};

export { loginUser, createUser };
