const fs = require('fs');
const oldData = require('../old-data/db.json');
const createMapData = require('./data/create-map-data');
const createGameData = require('./sql/create-game');
const { createGenreData, genreFromGames } = require('./sql/create-genre');
const { createPlatformData, platformsFromGames } = require('./sql/create-platform');
const { createPublisherData, publisherFromGames } = require('./sql/create-publisher');
const { createImageData, imageFromUserGame } = require('./sql/create-image');
const createUserData = require('./sql/create-user');
const createGameGenreData = require('./sql/create-game-genre');
const createGamePlatformData = require('./sql/create-game-platform');
const createGameImageData = require('./sql/create-game-image');
const createUserImageData = require('./sql/create-user-image');

const { videoGames, user } = oldData;
const publisherMap = createMapData(publisherFromGames(videoGames));
const genreMap = createMapData(genreFromGames(videoGames));
const platformMap = createMapData(platformsFromGames(videoGames));
const imageGameMap = createMapData(imageFromUserGame(videoGames, user));
const imageUserMap = createMapData(imageFromUserGame(videoGames, user));

const publisherData = createPublisherData(videoGames);
const genreData = createGenreData(videoGames);
const platformData = createPlatformData(videoGames);
const imageData = createImageData(videoGames, user);
const userData = createUserData(user);
const gameData = createGameData(videoGames, publisherMap);
const genreGameData = createGameGenreData(videoGames, genreMap);
const platformGameData = createGamePlatformData(videoGames, platformMap);
const imageGameData = createGameImageData(videoGames, imageGameMap);
const imageUserData = createUserImageData(user, imageUserMap);

const dataInjectionMigration = [
  publisherData,
  genreData,
  platformData,
  imageData,
  userData,
  gameData,
  genreGameData,
  platformGameData,
  imageGameData,
  imageUserData,
].join('');

console.log(dataInjectionMigration);

const date = new Date();
const dateStr = date.toLocaleString('lt-LT', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
})
  .replaceAll(':', '-')
  .replaceAll(' ', '-');
fs.writeFile(
  `sql/migrations/migration-${dateStr}-data-insertion.sql`,
  dataInjectionMigration,

  (err) => err && console.log(err),
);
