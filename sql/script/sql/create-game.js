const createGameData = (data, map) => {
  const injectGame = [...new Set(data
    .map((x) => `('${x.title}', ${x.price}, '${map[x.information.publisher]}')`))]
    .join(',\n');

  const gameQuery = `
insert into game (title, price, publisher_id) values 
${injectGame};
`;

  return gameQuery;
};

module.exports = createGameData;
