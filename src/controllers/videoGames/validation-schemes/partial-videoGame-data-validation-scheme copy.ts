import * as yup from 'yup';
import { PartialVideoGameData } from 'controllers/videoGames/types';

const partialvideoGamesValidationSheme: yup.ObjectSchema<PartialVideoGameData> = yup.object({
  title: yup.string()
    .min(2, 'Title must be at least 2 characters')
    .max(64, 'Title must be at most 32 characters'),
  information: yup
    .object({
      platforms: yup.array(yup.string().required())
        .required('Platform is required')
        .min(2, 'Publisher must be at least 2 characters')
        .max(64, 'Publisher must be at most 32 characters'),
      publisher: yup.string()
        .required('Publisher is required')
        .min(2, 'Publisher must be at least 2 characters')
        .max(64, 'Publisher must be at most 32 characters'),
      genres: yup.array(yup.string().required())
        .required('Genres is required')
        .min(2, 'Genres must be at least 2 characters')
        .max(64, 'Genres must be at most 32 characters'),
    }),
  price: yup.number()
    .positive('Price must be a positive number')
    .moreThan(2, 'Price must be at most 2 decimal places')
    .test(
      'priceFormat',
      'Price cant have more than 2 decimal points',
      (value) => value === undefined || Number(value.toFixed(2)) === value,
    ),
  images: yup
    .array(yup.string().required()),
}).strict(true);

export default partialvideoGamesValidationSheme;
