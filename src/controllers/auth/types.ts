export type RegistrationBody = Omit<UserEntity, 'id' | 'role'> & {
  passwordComfirmation: string,
};

export type Credentials = {
  email: string,
  password: string,
};

export type UserData = Omit<RegistrationBody, 'passwordComfirmation'>;

export type UserViewModel = Omit<UserEntity, 'password'>;

export type AuthResponse = {
  user: UserViewModel,
  token: string,
};
