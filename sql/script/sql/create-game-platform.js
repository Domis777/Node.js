const createGamePlatformData = (data, map) => {
  const insertionPlatformRows = data
    .map(({ information, id }) => information.platforms
      .map((y) => `(${map[y]}, ${id})`))
    .flat()
    .join(',\n');

  const gamePlatformQuery = `
insert into game_platform (platform_id, game_id) values
${insertionPlatformRows};
`;

  return gamePlatformQuery;
};

module.exports = createGamePlatformData;
