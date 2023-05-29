import { Response, Request, NextFunction } from 'express';
import { validateToken } from '../validations/auth';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emailAndPasswordFields = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

export const validFormatEmailAndPassword = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!emailRegex.test(email) || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  // const { id } = req.body;
  // console.log(id);
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const token = validateToken(authorization);
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', token);
    req.body.user = { token };
    next();
  } catch (err) {
    // console.log(err);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};
