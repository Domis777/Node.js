import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import JwtTokenServices from 'services/jwt-token-services';
import UserModel from 'models/user-model';
import UnauthorizedError from '../error/unauthorized-error';

const jwtTokenMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization === undefined) throw new UnauthorizedError();

    const token = authorization.split(' ').pop();
    if (token === undefined) throw new UnauthorizedError();

    const authData = JwtTokenServices.decode(token);
    if (authData === null) throw new UnauthorizedError();

    const currentTimeStamp = Math.floor(new Date().getTime() / 1000);
    if (currentTimeStamp > authData.exp) throw new UnauthorizedError();

    req.authUser = await UserModel.getUserByEmail(authData.email);

    next();
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default jwtTokenMiddleware;
