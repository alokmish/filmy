import axios from "axios";
import { useState, useEffect } from "react";

import Card, { CardProps } from "../components/Card";
import Genres from "../components/Genres";
import Pagination from "../components/Pagination";
import useGenre, { IGenre } from "../hooks/useGenre";
import { shapeShowData } from "../utils/data-shaper";

const ShowsPage = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState([] as CardProps[]);
  const [selectedGenres, setSelectedGenres] = useState([] as IGenre[]);
  const [genres, setGenres] = useState([] as IGenre[]);
  const genreListForURL = useGenre(selectedGenres);
  const fetchShows = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreListForURL}`
    );
    const shapedData = shapeShowData(data.results);
    setContent(shapedData);
    setLoading(false);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchShows();
    // eslint-disable-next-line
  }, [page, genreListForURL]);

  return (
    <>
      {loading ? (
        <section className="hero is-fullheight">
          <div className="hero-body">
            <div className="container is-flex is-justify-content-center is-align-items-center">
              <progress className="progress is-large is-info" max="100">
                50%
              </progress>
            </div>
          </div>
        </section>
      ) : (
        <section className="hero is-fullheight">
          <div className="container">
            <h1 className="title has-text-centered">Shows</h1>
            <h2 className="subtitle has-text-centered">
              Binge-worthy TV shows
            </h2>
          </div>
          <section className="section py-1">
            <Genres
              type="tv"
              selectedGenres={selectedGenres}
              genres={genres}
              setGenres={setGenres}
              setSelectedGenres={setSelectedGenres}
              setPage={setPage}
            />
          </section>
          <div className="hero-body">
            <div className="container">
              <div className="columns is-multiline">
                {content &&
                  content.map((item) => (
                    <div key={item.id} className="column is-one-fifth">
                      <Card {...item} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <Pagination currentPage={page} setCurrentPage={setPage} />
        </section>
      )}
    </>
  );
};

export default ShowsPage;
