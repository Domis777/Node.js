import NotFoundError from 'error/not-found-error';

class VideoGameNotFoundError extends NotFoundError {
  constructor(id: string) {
    super(`Game with id: ${id} was not found`);
  }
}

export default VideoGameNotFoundError;
