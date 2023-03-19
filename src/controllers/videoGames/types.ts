export type VideoGameViewModel = {
  game_id: number;
  title: string;
  price: number;
  rating?: number;
  information: {
    genres: string[];
    platforms: string[];
    publisher: string;
  };
  images: string[];
};

export type VideoGameData = Omit<VideoGameViewModel, 'game_id' | 'rating'>;

export type PartialVideoGameData = Partial<VideoGameData>;

export type VideoGameDataBody = PartialRecursive<VideoGameData>;
