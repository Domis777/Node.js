import { Response } from 'express';
import { ValidationError } from 'yup';
import NotFoundError from 'error/not-found-error';
import recursiveValidatioErrorReducer from 'helpers/recursice-validation-error-reducer';
import UnauthorizedError from '../error/unauthorized-error';
import ForbiddenError from '../error/forbidden-error';

const handleRequestError = (err: unknown, res: Response<ErrorResponse>) => {
  let status = 400;
  const errorResponse: ErrorResponse = {
    error: 'Request error',
  };

  if (err instanceof Error) errorResponse.error = err.message;
  if (err instanceof UnauthorizedError) status = 401;
  if (err instanceof ForbiddenError) status = 403;
  if (err instanceof NotFoundError) status = 404;
  if (err instanceof ValidationError && err.errors.length > 0) {
    errorResponse.errors = err.inner.reduce(recursiveValidatioErrorReducer, {});
  }

  res.status(status).json(errorResponse);
};

export default handleRequestError;
