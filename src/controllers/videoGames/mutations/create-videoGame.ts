import { RequestHandler } from 'express';
import videoGamesValidationSheme from 'controllers/videoGames/validation-schemes/videoGame-data-validation-scheme';
import handleRequestError from 'helpers/handle-request-error';
import VideoGamesModel from 'controllers/videoGames/games-model';
import ServerSetupError from 'error/server-setup-error';
import { VideoGameViewModel, VideoGameDataBody } from '../types';
import ForbiddenError from '../../../error/forbidden-error';

const createVideoGame: RequestHandler<
{},
VideoGameViewModel | ErrorResponse,
VideoGameDataBody,
{}
> = async (req, res) => {
  try {
    if (req.authUser === undefined) throw new ServerSetupError();

    const videoGamesData = videoGamesValidationSheme.validateSync(req.body, { abortEarly: false });

    if (req.authUser.role !== 'ADMIN') {
      throw new ForbiddenError();
    }

    const gameViewModel = await VideoGamesModel.createGame(videoGamesData);

    res.status(201).json(gameViewModel);
  } catch (error) {
    handleRequestError(error, res);
  }
};

export default createVideoGame;
