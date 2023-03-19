import { RequestHandler } from 'express';
import ServerSetupError from 'error/server-setup-error';
import handleRequestError from 'helpers/handle-request-error';
import createAuthResponse from 'controllers/auth/helper/create-auth-response';
import { AuthResponse } from '../types';

export const auth: RequestHandler<
{},
AuthResponse | ErrorResponse,
{},
{}
> = async (req, res) => {
  try {
    if (req.authUser === undefined) throw new ServerSetupError();

    res.status(200).json(createAuthResponse(req.authUser));
  } catch (error) {
    handleRequestError(error, res);
  }
};
