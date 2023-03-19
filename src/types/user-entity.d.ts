type UserEntity = {
  id: number,
  email: string,
  password: string,
  name: string,
  surname: string,
  phone: string,
  role: 'ADMIN' | 'USER',
  images: string[],
};
