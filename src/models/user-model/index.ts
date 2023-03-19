import mysql from 'mysql2/promise';
import config from 'config';
import NotFoundError from 'error/not-found-error';
import BcryptServices from 'services/bcrypt-services';
import { UserData } from '../../controllers/auth/types';
import SQL from './sql';

const checkEmail = async (email: string): Promise<true> => {
  const connection = await mysql.createConnection(config.database);

  const preparedSql = `
  select 1 from user where email = ?
  `;

  const bindings = [
    email,
  ];

  const [rows] = await connection.query<mysql.RowDataPacket[]>(preparedSql, bindings);
  connection.end();

  if (rows.length > 0) throw new Error(`Email ${email} is already taken`);

  return true;
};

const createUser = async (userData: UserData): Promise<UserEntity> => {
  const connection = await mysql.createConnection(config.database);

  const preparedSql = `
  insert into user (email, password, name, surname, phone) values 
  (?, ?, ?, ? , ?);

  set @created_user_id = last_insert_id();

  insert into image (src) values
  ${userData.images.map(() => '(?)').join(',\n')};

  set @image_id = last_insert_id();

  insert into user_image (image_id, user_id)
  select image_id, @created_user_id as user_id
  from image
  where image_id >= @image_id;

  ${SQL.SELECT}
  where ur.user_id = @created_user_id
  ${SQL.GROUPS}
  `;

  const bindings = [
    userData.email,
    BcryptServices.encrypt(userData.password),
    userData.name,
    userData.surname,
    userData.phone,
    ...userData.images,
  ];

  const [queryResult] = await connection.query<mysql.RowDataPacket[][]>(preparedSql, bindings);
  const [user] = queryResult[queryResult.length - 1] as UserEntity[];

  connection.end();

  return user;
};

const getUserByEmail = async (email: string): Promise<UserEntity> => {
  const connection = await mysql.createConnection(config.database);

  const preparedSql = `
  ${SQL.SELECT}
  where ur.email = ?
  ${SQL.GROUPS}
  `;

  const bindings = [email];

  const [users] = await connection.query<mysql.RowDataPacket[]>(preparedSql, bindings);

  connection.end();

  if (users.length === 0) throw new NotFoundError(`User with email: ${email} is was not found`);

  return users[0] as UserEntity;
};

const UserModel = {
  createUser,
  checkEmail,
  getUserByEmail,
};

export default UserModel;
