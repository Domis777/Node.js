import { Router } from 'express';
import { register } from './methods/register';
import { login } from './methods/login';
import { auth } from './methods/auth';
import jwtTokenMiddleware from '../../middlewares/jwt-token-middleware';

const authController = Router();

authController.post('/register', register);

authController.post('/login', login);

authController.post('/auth', jwtTokenMiddleware, auth);

export default authController;
