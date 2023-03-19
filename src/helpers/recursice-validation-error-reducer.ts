import { ValidationError } from 'yup';
import { getRandomId } from './create-id';

const recursiveValidatioErrorReducer = (
  prevErrObj: RecursiveStringObject,
  validationError: ValidationError,
  _index: number,
  validationErrors: ValidationError[],
): RecursiveStringObject => {
  const errorKey: string = validationError.path || String(getRandomId());

  const [mainKey, ...nextKeys] = errorKey.split('.');

  if (nextKeys.length === 0) {
    return {
      ...prevErrObj,
      [mainKey]: validationError.message,
    };
  }

  if (!(mainKey in prevErrObj)) {
    const childrenValidationErrors = validationErrors
      .filter((childValidationErrors) => childValidationErrors.path?.startsWith(`${mainKey}.`))
      .map((childError) => {
        const newValidationError = new ValidationError(
          childError.errors.length === 1 ? childError.message : childError.inner,
          childError.value,
          childError.path?.split('.').slice(1).join('.'),
        );
        return newValidationError;
      });

    return {
      ...prevErrObj,
      [mainKey]: childrenValidationErrors.reduce(recursiveValidatioErrorReducer, {}),
    };
  }

  return prevErrObj;
};

export default recursiveValidatioErrorReducer;
