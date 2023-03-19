const platformsFromGames = (map) => [...new Set(map
  .map((x) => x.information.platforms).flat())];

const createPlatformData = (data) => {
  const platformData = platformsFromGames(data);

  const injectPlatforms = platformData
    .map((x) => `('${x}')`)
    .flat()
    .join(',\n');

  const platformQuery = `
insert into platform (platform) values
${injectPlatforms};
`;

  return platformQuery;
};

module.exports = {
  createPlatformData,
  platformsFromGames,
};
