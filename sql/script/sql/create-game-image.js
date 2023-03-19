const createGameImageData = (data, map) => {
  const insertionGameImageRows = data
    .map(({ image, id }) => image
      .map((y) => `(${id}, ${map[y]})`))
    .flat()
    .join(',\n');

  const gameImageQuery = `
insert into game_image (game_id, image_id) values
${insertionGameImageRows};
`;

  return gameImageQuery;
};

module.exports = createGameImageData;
