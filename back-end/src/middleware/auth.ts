import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';


export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // token will be send to this header
    let token: string | null = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access denied");
    }

    if (token.startsWith("Bearer")) {
      token = token.slice(7, token.length).trim();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = verified;
    next();
  } catch(err) {
    res.status(500).json({error: err.message});
  }
};