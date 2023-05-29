import { verify, sign, Secret, SignOptions } from 'jsonwebtoken';

const secretKey: Secret = process.env.JWT_SECRET as string;

const configJWT: SignOptions = {
  expiresIn: '3d',
  algorithm: 'HS256',
};

export interface tokenParams {
  email: string;
  role: string;
}

export const generateToken = (payload: tokenParams) => {
  const token = sign({ payload }, secretKey, configJWT);
  return token;
};

export const validateToken = (authorization: string) => {
  const isValid = verify(authorization, secretKey);
  return isValid;
};
