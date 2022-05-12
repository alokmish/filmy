import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";

import Card, { CardProps } from "../components/Card";
import Pagination from "../components/Pagination";
import {
  shapeContentData,
  shapeMovieData,
  shapeShowData,
} from "../utils/data-shaper";

const SearchPage = () => {
  const { type, query } = useParams();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([] as CardProps[]);
  const fetchResults = async () => {
    // const { data } = await axios.get(
    //   `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_APIKEY}&page=${page}`
    // );
    setLoading(true);
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type}?api_key=38ec201fb1fa7cdffa88b74569f61507&language=en-US&query=${query}&page=${page}&include_adult=false`
    );
    let shapedData;
    if (type === "movie") {
      shapedData = shapeMovieData(data.results);
    } else if (type === "tv") {
      shapedData = shapeShowData(data.results);
    } else {
      shapedData = shapeContentData(data.results);
    }
    setContent(shapedData);
    setLoading(false);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchResults();
    // eslint-disable-next-line
  }, [page]);

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
            <h1 className="title has-text-centered">Search</h1>
            <h2 className="subtitle has-text-centered">
              We found what you were looking for
            </h2>
          </div>
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

export default SearchPage;
