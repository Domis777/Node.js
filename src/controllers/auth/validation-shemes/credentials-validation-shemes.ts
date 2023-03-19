import * as yup from 'yup';
import { Credentials } from 'controllers/auth/types';

const credentialsValidationShemes: yup.ObjectSchema<Credentials> = yup.object({
  email: yup.string().required('Email is required'),
  password: yup.string().required('Password is required'),
}).strict(true);

export default credentialsValidationShemes;
