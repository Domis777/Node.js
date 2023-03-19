import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import ServerSetupError from 'error/server-setup-error';
import { VideoGameViewModel } from '../types';
import VideoGamesModel from '../games-model/index';
import ForbiddenError from '../../../error/forbidden-error';

const deleteVideoGame: RequestHandler<
{ id?: string },
VideoGameViewModel | ErrorResponse,
{},
{}
> = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined || req.authUser === undefined) throw new ServerSetupError();

    const gameViewModel = await VideoGamesModel.getGame(id);

    if (req.authUser.role !== 'ADMIN') {
      throw new ForbiddenError();
    }

    await VideoGamesModel.deleteGame(id);

    res.status(200).json(gameViewModel);
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default deleteVideoGame;
