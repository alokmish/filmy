import { CardProps } from "../components/Card";

export interface TMDBResponse {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  name: string;
}

export const shapeContentData = (data: TMDBResponse[]): CardProps[] => {
  const shapedData = data.map((item: TMDBResponse) => {
    let image = null;
    if (item.poster_path) {
      image = `https://image.tmdb.org/t/p/w300${item.poster_path}`;
    } else if (item.backdrop_path) {
      image = `https://image.tmdb.org/t/p/w300${item.backdrop_path}`;
    } else {
      image = `https://www.movienewz.com/img/films/poster-holder.jpg`;
    }
    return {
      title: item.title || item.name,
      image,
      rating: item.vote_average,
      description: item.overview,
      type: item.media_type,
      like: item.vote_count,
      id: item.id,
    } as CardProps;
  });
  return shapedData;
};

export const shapeMovieData = (data: TMDBResponse[]): CardProps[] => {
  const shapedData = data.map((item: TMDBResponse) => {
    let image = null;
    if (item.poster_path) {
      image = `https://image.tmdb.org/t/p/w300${item.poster_path}`;
    } else if (item.backdrop_path) {
      image = `https://image.tmdb.org/t/p/w300${item.backdrop_path}`;
    } else {
      image = `https://www.movienewz.com/img/films/poster-holder.jpg`;
    }
    return {
      title: item.title || item.name,
      image,
      rating: item.vote_average,
      description: item.overview,
      type: "movie",
      like: item.vote_count,
      id: item.id,
    } as CardProps;
  });
  return shapedData;
};

export const shapeShowData = (data: TMDBResponse[]): CardProps[] => {
  const shapedData = data.map((item: TMDBResponse) => {
    let image = null;
    if (item.poster_path) {
      image = `https://image.tmdb.org/t/p/w300${item.poster_path}`;
    } else if (item.backdrop_path) {
      image = `https://image.tmdb.org/t/p/w300${item.backdrop_path}`;
    } else {
      image = `https://www.movienewz.com/img/films/poster-holder.jpg`;
    }
    return {
      title: item.title || item.name,
      image,
      rating: item.vote_average,
      description: item.overview,
      type: "tv",
      like: item.vote_count,
      id: item.id,
    } as CardProps;
  });
  return shapedData;
};
