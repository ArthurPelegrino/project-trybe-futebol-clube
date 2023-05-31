import { Response, Request, NextFunction } from 'express';
import MatchesService from '../services/MatchService';
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
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', token);
    req.body.user = { token };
    console.log('validation working');
    next();
  } catch (err) {
    // console.log(err);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export const checkCreateTeams = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  const isHomeTeamInBank = await MatchesService.findById(Number(homeTeamId));
  const isAwayTeamInBank = await MatchesService.findById(Number(awayTeamId));
  if (homeTeamId === awayTeamId) {
    return res.status(422).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }
  if (isHomeTeamInBank === 'fail' || isAwayTeamInBank === 'fail') {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};
