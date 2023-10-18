import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import User from "../models/User.ts";


import { verifyToken } from "../middleware/auth.ts";
import randomise from "../utils/randomise.ts";
import {
  deleteUser,
  login,
  resendCode,
  restoreUserPassword,
  signUpStep1,
  signUpStep2,
} from "../controllers/auth.ts";
const router = express.Router();

router.post(
  "/signup/step-1",
  [
    body("name")
      .isLength({ min: 2 })
      .withMessage("Name must contain at least 2 characters"),
    body("email").isEmail().withMessage("Enter valid email message"),
    body("password")
      .isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1 })
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and be at least 8 characters long"
      ),
  ],
  signUpStep1
);

router.post("/signup/step-2", signUpStep2);

router.patch("/signup/resend-code", resendCode);

router.delete("/signup/delete-data/:userId", deleteUser);

router.post("/login", login);

router.post("/restore-password", restoreUserPassword);

/* router.delete('/logout', async (req, res) => {
  try {
      
  } catch (err) {
  }
}); */

export default router;
