const imageFromGames = (map) => [...new Set(map
  .map((x) => x.image).flat())];

const imageFromUser = (map) => [...new Set(map
  .map((x) => x.profileImg).flat())];

const imageFromUserGame = (map1, map2) => imageFromGames(map1).concat(imageFromUser(map2));

const createImageData = (data1, data2) => {
  const imageUserGameData = imageFromUserGame(data1, data2);

  const injectGenre = imageUserGameData
    .map((x) => `('${x}')`)
    .flat()
    .join(',\n');

  const imageQuery = `
insert into image (src) values
${injectGenre};
`;

  return imageQuery;
};

module.exports = {
  createImageData,
  imageFromUserGame,
};
