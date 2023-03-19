import jwt from 'jsonwebtoken';
import config from 'config';

type TokenData = {
  email: string,
  id: number,
};

type DecotedTokenData = TokenData & {
  iat: number,
  exp: number,
};

const create = (data: TokenData) => jwt
  .sign(data, config.token.secret, {
    expiresIn: config.token.expiration,
  });

const decode = (token: string) => {
  const decodeData = jwt.decode(token);

  if (decodeData === null) return null;

  return decodeData as DecotedTokenData;
};

const JwtTokenServices = {
  create,
  decode,
};

export default JwtTokenServices;
