import registrationBodyValidationSheme from 'controllers/auth/validation-shemes/registration-body-validation-sheme';
import handleRequestError from 'helpers/handle-request-error';
import { RequestHandler } from 'express';
import { RegistrationBody, AuthResponse } from 'controllers/auth/types';
import UserModel from 'models/user-model';
import createAuthResponse from 'controllers/auth/helper/create-auth-response';

export const register: RequestHandler<
{},
AuthResponse | ErrorResponse,
Partial<RegistrationBody>,
{}
> = async (req, res) => {
  try {
    const {
      passwordComfirmation,
      ...userData
    } = registrationBodyValidationSheme.validateSync(req.body, { abortEarly: false });

    await UserModel.checkEmail(userData.email);

    const userEntity = await UserModel.createUser(userData);

    res.send(createAuthResponse(userEntity));
  } catch (error) {
    handleRequestError(error, res);
  }
};
