import JwtTokenServices from 'services/jwt-token-services';
import { AuthResponse } from 'controllers/auth/types';

const createAuthResponse = ({ password, ...userViewModel }: UserEntity) : AuthResponse => ({
  user: userViewModel,
  token: JwtTokenServices.create({
    email: userViewModel.email,
    id: userViewModel.id,
  }),
});

export default createAuthResponse;
