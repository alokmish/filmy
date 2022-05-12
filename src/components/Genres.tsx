import axios from "axios";
import { useEffect } from "react";
import { IGenre } from "../hooks/useGenre";

export interface GenreProps {
  selectedGenres: IGenre[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSelectedGenres: React.Dispatch<React.SetStateAction<IGenre[]>>;
  type: string;
  genres: IGenre[];
  setGenres: React.Dispatch<React.SetStateAction<IGenre[]>>;
}

const Genres: React.FC<GenreProps> = ({
  selectedGenres,
  setPage,
  setSelectedGenres,
  type,
  genres,
  setGenres,
}) => {
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=38ec201fb1fa7cdffa88b74569f61507&language=en-US`
    );
    setGenres(data.genres);
  };
  const handleAdd = (genre: IGenre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };
  const handleRemove = (genre: IGenre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };
  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres([] as IGenre[]);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="tags">
        {selectedGenres &&
          selectedGenres.map((sGenre) => (
            <span
              key={sGenre.id}
              className="tag is-link is-clickable"
              onClick={(e) => handleRemove(sGenre)}
            >
              {sGenre.name}
              <button title="delete tag" className="delete is-small"></button>
            </span>
          ))}
      </div>
      <div className="tags">
        {genres &&
          genres.map((genre) => (
            <span
              key={genre.id}
              className="tag is-link is-light is-clickable"
              onClick={(e) => handleAdd(genre)}
            >
              {genre.name}
            </span>
          ))}
      </div>
    </>
  );
};

export default Genres;
