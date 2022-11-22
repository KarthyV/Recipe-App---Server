import jwt from "jsonwebtoken";
import { Users } from "../models/user.model.js";
import { Sessions } from "../models/session.model.js";

const authorizeAdmin = async (req, res, next) => {
  try {
    const userToken = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(userToken, process.env.SECRET);
    if (decodedToken) {
      const session = await Sessions.findOne({ token: userToken });
      const user = await Users.findById(session.userId);
      if (user.role == "Admin") {
        next();
      } else {
        return res.status(401).send({ message: "Not Authorized" });
      }
    }
  } catch (error) {
    return res.status(401).send({ message: "Not Authorized" });
  }
};

const authorizeUser = async (req, res, next) => {
  try {
    const userToken = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(userToken, process.env.SECRET);
    if (decodedToken) {
      const session = await Sessions.findOne({ token: userToken });
      const user = await Users.findById(session.userId);
      if (user.role == "Admin" || user.role == "Normal") {
        next();
      } else {
        return res.status(401).send({ message: "Not Authorized" });
      }
    }
  } catch (error) {
    return res.status(401).send({ message: "Not Authorized" });
  }
};

export { authorizeAdmin, authorizeUser };
