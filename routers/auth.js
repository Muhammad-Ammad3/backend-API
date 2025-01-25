import express from "express";
import User from "../models/User.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import "dotenv/config";
import sendResponse from "../helpers/sendResponse.js";
import  jwt  from "jsonwebtoken";
const router = express.Router();

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  fullname: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});
const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

router.post("/register", async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);
  if (error) return sendResponse(res, 400, null, true, error.message);
  const user = await User.findOne({ email: value.email });
  if (user)
    return sendResponse(
      res,
      403,
      null,
      true,
      "User with this email already registerd."
    );
  const hashedPassword = await bcrypt.hash(value.password, 12);
  value.password = hashedPassword
  let newUser = new User({...value})
  newUser = await newUser.save()
  sendResponse(res, 201, newUser, false, "User Registered Successfully")
});
router.post("/login", async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return sendResponse(res, 400, null, true, error.message);
    const user = await User.findOne({ email: value.email }).lean();
    if (!user)
      return sendResponse(
        res,
        403,
        null,
        true,
        "User is not registerd."
      );
    const isPasswordValid = await bcrypt.compare(value.password, user.password);
    if(!isPasswordValid) return sendResponse(res, 403, newUser, true, "Invalid Credentials")
   let token = jwt.sign(user , process.env.AUTH_SECRET)
    sendResponse(res, 200, {user,token}, false, "User Login Successfully")
  });
// router.post("/reset-password" , (req,res) => {})
// router.post("/forget-password" , (req,res) => {})

export default router;
