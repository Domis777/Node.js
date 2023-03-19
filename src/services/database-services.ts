import mysql from 'mysql2';
import config from 'config';

const connect = (callback: VoidFunction) => {
  const connection = mysql.createConnection(config.database);

  connection.query('SELECT 1', (err) => {
    if (err !== null) {
      console.error('Error: Failed connect to database');
      throw err;
    }

    callback();
    connection.end();
  });
};

const DatabaseService = {
  connect,
};

export default DatabaseService;
