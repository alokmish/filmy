export interface IGenre {
  id: number;
  name: string;
}

const useGenre = (selectedGenres: IGenre[]) => {
  if (selectedGenres.length < 1) return "";

  const GenreIDs = selectedGenres.map((g) => g.id);
  return GenreIDs.reduce(
    (acc, curr) => `${acc.toString()}, ${curr.toString()}`,
    ""
  );
};

export default useGenre;
