import * as yup from 'yup';
import { RegistrationBody } from 'controllers/auth/types';

const registrationBodyValidationSheme: yup.ObjectSchema<RegistrationBody> = yup.object({
  email: yup.string()
    .required('Email is required')
    .email('Incorect email fromat'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 32 characters')
    .matches(/[A-Z]{1}/, 'Password must have at least one upper case letter')
    .matches(/[a-z]{1}/, 'Password must have at least one lower case letter')
    .matches(/[0-9]{1}/, 'Password must have at least one number')
    .matches(/[!@#$%^&*]{1}/, 'Password must have at least one special character (!@#$%^&*)'),
  passwordComfirmation: yup.string()
    .required('Password is required')
    .oneOf([yup.ref('password')], 'Password not matching'),
  name: yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(64, 'Name must be at most 32 characters'),
  surname: yup.string()
    .required('Surname is required')
    .min(2, 'Surname must be at least 2 characters')
    .max(64, 'Surname must be at most 32 characters'),
  phone: yup.string()
    .required('Phone is required')
    .min(9, 'Phone must be at least 9 characters')
    .max(32, 'Phone must be at most 32 characters'),
  images: yup
    .array(yup.string()
      .required('Image is required')
      .url('Image must be accessible'))
    .required('Image is required'),
}).strict(true);

export default registrationBodyValidationSheme;
