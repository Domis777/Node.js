import { RequestHandler } from 'express';
import { VideoGameViewModel } from 'controllers/videoGames/types';
import handleRequestError from 'helpers/handle-request-error';
import ServerSetupError from 'error/server-setup-error';
import VideoGamesModel from '../games-model/index';

const getVideoGame: RequestHandler<
{ id?: string },
VideoGameViewModel | ErrorResponse,
undefined,
{}
> = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined) throw new ServerSetupError();

    const game = await VideoGamesModel.getGame(id);

    res.json(game);
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default getVideoGame;
