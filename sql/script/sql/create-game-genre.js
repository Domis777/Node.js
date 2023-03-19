const createGameGenreData = (data, map) => {
  const insertionGenreRows = data
    .map(({ information, id }) => information.genres
      .map((y) => `(${map[y]}, ${id})`))
    .flat()
    .join(',\n');

  const gameGenreQuery = `
insert into game_genre (genre_id, game_id) values
${insertionGenreRows};
`;

  return gameGenreQuery;
};

module.exports = createGameGenreData;
