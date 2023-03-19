import mysql from 'mysql2/promise';
import SQL from 'controllers/videoGames/games-model/sql';
import { VideoGameViewModel, VideoGameData } from 'controllers/videoGames/types';
import config from 'config/index';
import VideoGameNotFoundError from '../videoGames-not-found-error';

const getGames = async (): Promise<VideoGameViewModel[]> => {
  const connection = await mysql.createConnection(config.database);

  const sql = `
  ${SQL.SELECT}
  ${SQL.GROUP}
  `;

  const [games] = await connection.query(sql);

  connection.end();

  return games as VideoGameViewModel[];
};

const getGame = async (id: string): Promise<VideoGameViewModel> => {
  const connection = await mysql.createConnection(config.database);

  const preparedSql = `
    ${SQL.SELECT}
    where gm.game_id = ?
    ${SQL.GROUP};
    `;

  const bindings = [id];

  const [games] = await connection.query<mysql.RowDataPacket[]>(preparedSql, bindings);

  connection.end();

  if (games.length === 0) throw new VideoGameNotFoundError(id);

  return games[0] as VideoGameViewModel;
};

const deleteGame = async (id: string): Promise<void> => {
  const connection = await mysql.createConnection(config.database);

  const preparedSql = `
    DELETE from game_genre
    WHERE game_id = ?;
    
    DELETE from game_platform
    WHERE game_id = ?;
    
    SET @gameImagesIds = (
      select group_concat(image_id) 
      from game_image 
      where game_id = ?
      group by game_id);  
      
    DELETE from game_image
    WHERE game_id = ?;

    DELETE from image
    WHERE find_in_set(image_id, @gameImagesIds);

    DELETE from game
    WHERE game_id = ?;
    `;

  const bindings = [id, id, id, id, id];

  await connection.query(preparedSql, bindings);

  connection.end();
};

const createGame = async (videoGamesData: VideoGameData): Promise<VideoGameViewModel> => {
  const connection = await mysql.createConnection(config.database);

  const preparedSql = `
  insert ignore publisher (publisher) 
  values (?); 
  set @find_publisher = (select pb.publisher_id from publisher as pb where pb.publisher = ?);
  
  insert into game (title, price, publisher_id) values
  (?, ?, @find_publisher);
  
  set @created_game_id = last_insert_id();
  
  insert into image (src) values
  ${videoGamesData.images.map(() => '(?)').join(',\n')};
  
  set @image_id = last_insert_id();
  
  insert into game_image (image_id, game_id)
  select image_id, @created_game_id as game_id
  from image
  where image_id >= @image_id;
  
  insert ignore genre (genre) values 
  ${videoGamesData.information.genres.map(() => '(?)').join(',\n')};
  
  insert into game_genre (genre_id, game_id)
  select gr.genre_id , @created_game_id as game_id
  from genre as gr 
  where gr.genre in (
  ${videoGamesData.information.genres.map(() => '?').join(',\n')}
  );
  
  insert ignore platform (platform) values 
  ${videoGamesData.information.platforms.map(() => '(?)').join(',\n')};
  
  insert into game_platform (platform_id, game_id)
  select pf.platform_id , @created_game_id as game_id
  from platform as pf
  where pf.platform in (
    ${videoGamesData.information.platforms.map(() => '?').join(',\n')}
  );

  ${SQL.SELECT}
  where gm.game_id = @created_game_id
  ${SQL.GROUP};
  `;

  const bindings = [
    videoGamesData.information.publisher,
    videoGamesData.information.publisher,
    videoGamesData.title,
    videoGamesData.price,
    ...videoGamesData.images,
    ...videoGamesData.information.genres,
    ...videoGamesData.information.genres,
    ...videoGamesData.information.platforms,
    ...videoGamesData.information.platforms,
  ];

  const [querryResult] = await connection.query<mysql.RowDataPacket[][]>(preparedSql, bindings);

  const [games] = querryResult[querryResult.length - 1] as VideoGameViewModel[];

  connection.end();

  return games;
};

const replaceGame = async (
  gameId: number | string,
  videoGamesData: VideoGameData,
): Promise<VideoGameViewModel> => {
  const connection = await mysql.createConnection(config.database);

  const preparedSql = `
  insert ignore publisher (publisher) 
  values (?); 
  set @find_publisher = (select pb.publisher_id from publisher as pb where pb.publisher = ?);
  
  update game set
  title = ?,
  price = ?,
  publisher_id = @find_publisher
  where game_id = ?;
  
  set @gameImgIds = (
  select group_concat(image_id)
  from game_image
  where game_id = ?
  group by game_id);
  
  delete from game_image
  where game_id = ?;
  
  delete from image
  where find_in_set(image_id, @gameImgIds);
  
  insert into image (src) values
  ${videoGamesData.images.map(() => '(?)').join(',\n')};
  
  set @image_id = last_insert_id();
  
  insert into game_image (image_id, game_id)
  select image_id, ? as game_id
  from image
  where image_id >= @image_id;
  
  delete from game_genre
  where game_id = ?;
  
  insert ignore genre (genre) values 
  ${videoGamesData.information.genres.map(() => '(?)').join(',\n')};
  
  insert into game_genre (genre_id, game_id)
  select gr.genre_id , ?
  from genre as gr 
  where gr.genre in (
  ${videoGamesData.information.genres.map(() => '?').join(',\n')}
  );
  
  delete from game_platform
  where game_id = ?;
  
  insert ignore platform (platform) 
  values 
  ${videoGamesData.information.platforms.map(() => '(?)').join(',\n')};
  
  insert into game_platform (platform_id, game_id)
  select pf.platform_id , ?
  from platform as pf
  where pf.platform in (
  ${videoGamesData.information.platforms.map(() => '?').join(',\n')}
  );
  
  ${SQL.SELECT}
  where gm.game_id = ?
  ${SQL.GROUP};
  `;

  const bindings = [
    videoGamesData.information.publisher,
    videoGamesData.information.publisher,
    videoGamesData.title,
    videoGamesData.price,
    gameId,
    gameId,
    gameId,
    ...videoGamesData.images,
    gameId,
    gameId,
    ...videoGamesData.information.genres,
    gameId,
    ...videoGamesData.information.genres,
    gameId,
    ...videoGamesData.information.platforms,
    gameId,
    ...videoGamesData.information.platforms,
    gameId,
  ];

  const [querryResult] = await connection.query<mysql.RowDataPacket[][]>(preparedSql, bindings);

  const [games] = querryResult[querryResult.length - 1] as VideoGameViewModel[];

  connection.end();

  return games;
};

const VideoGamesModel = {
  getGames,
  getGame,
  deleteGame,
  createGame,
  replaceGame,
};

export default VideoGamesModel;
