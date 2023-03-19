import { RequestHandler } from 'express';
import { VideoGameViewModel } from 'controllers/videoGames/types';
import VideoGamesModel from '../games-model/index';

const getVideoGames: RequestHandler<
{},
VideoGameViewModel[],
undefined,
{}
> = async (_req, res) => {
  const games = await VideoGamesModel.getGames();

  res.json(games);
};

export default getVideoGames;
