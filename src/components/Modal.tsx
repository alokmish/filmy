import axios from "axios";
import { useEffect, useState } from "react";
import { BsCollectionPlayFill, BsFillPlayBtnFill } from "react-icons/bs";
import { SiImdb, SiYoutube } from "react-icons/si";
import { FcLike } from "react-icons/fc";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

export interface IModalData {
  type: string;
  id: number;
}

export interface IContent {
  id: number;
  release_date: string;
  adult: boolean;
  poster_path: string;
  backdrop_path: string;
  title: string;
  name: string;
  tagline: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  imdb_id: string;
  homepage: string;
  overview: string;
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
}

const Modal = () => {
  const { closeModal } = useActions();
  const { modalData } = useTypedSelector((state) => state.modal);
  const [content, setContent] = useState({} as IContent);
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    if (modalData) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${modalData?.type}/${modalData?.id}?api_key=38ec201fb1fa7cdffa88b74569f61507&language=en-US`
      );
      setContent(data);
    }
  };
  const fetchTrailer = async () => {
    if (modalData) {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${modalData?.type}/${modalData?.id}/videos?api_key=38ec201fb1fa7cdffa88b74569f61507&language=en-US`
      );
      setVideo(data.results[0]?.key);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
    fetchTrailer();
    setLoading(false);
    // eslint-disable-next-line
  }, [modalData]);
  return (
    <div id="content-details-modal" className="modal">
      <div className="modal-background" onClick={closeModal}></div>
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
        <div className="modal-content">
          {content && (
            <div className="box">
              <div className="columns">
                <div className="column">
                  <figure className="image is-4by5">
                    {content.poster_path ? (
                      <img
                        alt={content.title || content.name}
                        src={`https://image.tmdb.org/t/p/w500/${content.poster_path}`}
                      />
                    ) : content.backdrop_path ? (
                      <img
                        alt={content.title || content.name}
                        src={`https://image.tmdb.org/t/p/w500/${content.backdrop_path}`}
                      />
                    ) : (
                      <img
                        alt={content.title || content.name}
                        src={`https://www.movienewz.com/img/films/poster-holder.jpg`}
                      />
                    )}
                  </figure>
                </div>
                <div className="column">
                  <section>
                    <h1 className="title is-5">
                      {content.name || content.title}
                    </h1>
                    <h3 className="subtitle is-6">{content.tagline}</h3>
                  </section>
                  <section className="mt-3">
                    {modalData?.type === "movie" ? (
                      <span className="icon-text">
                        <span className="icon">
                          <BsFillPlayBtnFill />
                        </span>
                        <span>Movie</span>
                      </span>
                    ) : (
                      <span className="icon-text">
                        <span className="icon">
                          <BsCollectionPlayFill />
                        </span>
                        <span>Series</span>
                      </span>
                    )}
                    <span className="icon-text ml-6">
                      <span className="icon">
                        <FcLike />
                      </span>
                      <span>{content.vote_count}</span>
                    </span>
                    <span className="tag is-danger ml-6">
                      {content.vote_average}
                    </span>
                  </section>
                  <section className="mt-3">
                    <div className="tags">
                      {content.genres &&
                        content.genres.map((genre) => (
                          <span key={genre.id} className="tag is-link is-light">
                            {genre.name}
                          </span>
                        ))}
                    </div>
                  </section>
                  <section className="mt-3">
                    <p className="is-size-7">{content.overview}</p>
                  </section>
                  <section className="mt-3">
                    <div className="field is-grouped">
                      <p className="control">
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={`https://www.imdb.com/title/${content.imdb_id}/`}
                          className="button is-small is-warning"
                        >
                          <span className="icon">
                            <SiImdb />
                          </span>
                          <span>IMDB</span>
                        </a>
                      </p>
                      <p className="control">
                        <a
                          target="_blank"
                          rel="noreferrer"
                          href={`https://www.youtube.com/watch?v=${video}`}
                          className="button is-small is-danger"
                        >
                          <span className="icon">
                            <SiYoutube />
                          </span>
                          <span>Trailer</span>
                        </a>
                      </p>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={closeModal}
      ></button>
    </div>
  );
};

export default Modal;
