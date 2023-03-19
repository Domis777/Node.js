const bcrypt = require('bcrypt');

const createUserData = (data) => {
  const injectUser = [...new Set(data
    .map((x) => `('${x.email}', '${x.name}', '${x.surname}', '${bcrypt.hashSync(x.password, 10)}', '${x.phone}', '${x.role}')`))]
    .join(',\n');

  const userQuery = `
insert into user (email, name, surname, password, phone, role) values 
${injectUser};
`;

  return userQuery;
};

module.exports = createUserData;
