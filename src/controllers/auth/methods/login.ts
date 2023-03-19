import handleRequestError from 'helpers/handle-request-error';
import { RequestHandler } from 'express';
import { Credentials, AuthResponse } from 'controllers/auth/types';
import UserModel from 'models/user-model';
import BcryptServices from 'services/bcrypt-services';
import credentialsValidationShemes from 'controllers/auth/validation-shemes/credentials-validation-shemes';
import createAuthResponse from 'controllers/auth/helper/create-auth-response';

export const login: RequestHandler<
{},
AuthResponse | ErrorResponse,
Partial<Credentials>,
{}
> = async (req, res) => {
  try {
    const credentials = credentialsValidationShemes.validateSync(req.body, { abortEarly: false });

    const userEntity = await UserModel.getUserByEmail(credentials.email);

    const correctPassword = BcryptServices.compare(credentials.password, userEntity.password);
    if (!correctPassword) throw new Error('Invalid password');

    res.send(createAuthResponse(userEntity));
  } catch (error) {
    handleRequestError(error, res);
  }
};
