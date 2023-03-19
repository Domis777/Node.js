import bcrypt from 'bcrypt';
import config from 'config';

const encrypt = (plain: string) => bcrypt.hashSync(plain, config.bcryptRounds);

const compare = (plain: string, encrypted: string) => bcrypt.compareSync(plain, encrypted);

const BcryptServices = {
  encrypt,
  compare,
};

export default BcryptServices;
