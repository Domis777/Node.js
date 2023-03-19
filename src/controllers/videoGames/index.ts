import express from 'express';
import getVideoGames from './queries/get-videoGames';
import getVideoGame from './queries/get-videoGame';
import createVideoGame from './mutations/create-videoGame';
import deleteVideoGame from './mutations/delete-videoGames';
import putVideoGame from './mutations/put-videoGame';
import jwtTokenMiddleware from '../../middlewares/jwt-token-middleware';

const videoGamesController = express.Router();

videoGamesController.get('/', getVideoGames);
videoGamesController.get('/:id', getVideoGame);
videoGamesController.post('/', jwtTokenMiddleware, createVideoGame);
videoGamesController.put('/:id', jwtTokenMiddleware, putVideoGame);
videoGamesController.delete('/:id', jwtTokenMiddleware, deleteVideoGame);

export default videoGamesController;
