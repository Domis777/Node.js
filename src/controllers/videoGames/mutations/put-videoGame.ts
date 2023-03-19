import { RequestHandler } from 'express';
import videoGamesValidationSheme from 'controllers/videoGames/validation-schemes/videoGame-data-validation-scheme';
import handleRequestError from 'helpers/handle-request-error';
import ServerSetupError from 'error/server-setup-error';
import { VideoGameViewModel, VideoGameDataBody } from '../types';
import VideoGamesModel from '../games-model/index';
import ForbiddenError from '../../../error/forbidden-error';

const putVideoGame: RequestHandler<
{ id?: string },
VideoGameViewModel | ErrorResponse,
VideoGameDataBody,
{}
> = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined || req.authUser === undefined) throw new ServerSetupError();

    const videoGamesData = videoGamesValidationSheme.validateSync(req.body);

    if (req.authUser.role !== 'ADMIN') {
      throw new ForbiddenError();
    }

    const gameViewModel = await VideoGamesModel.replaceGame(id, videoGamesData);

    res.status(200).json(gameViewModel);
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default putVideoGame;
