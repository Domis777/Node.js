const genreFromGames = (map) => [...new Set(map
  .map((x) => x.information.genres).flat())];

const createGenreData = (data) => {
  const genreData = genreFromGames(data);

  const injectGenre = genreData
    .map((x) => `('${x}')`)
    .flat()
    .join(',\n');

  const genreQuery = `
insert into genre (genre) values
${injectGenre};
`;

  return genreQuery;
};

module.exports = {
  createGenreData,
  genreFromGames,
};
