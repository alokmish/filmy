import { BsFillPlayBtnFill, BsCollectionPlayFill } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { useActions } from "../hooks/useActions";

export interface CardProps {
  id: number;
  title: string;
  image: string;
  rating: number;
  description: string;
  type: string;
  like: number;
}

const Card: React.FC<CardProps> = ({
  title,
  image,
  rating,
  type,
  like,
  id,
}) => {
  const { openModal } = useActions();
  return (
    <div className="card" onClick={() => openModal({ type, id })}>
      <div className="card-image">
        <figure className="image is-3by4">
          <img alt={title} src={image} />
        </figure>
      </div>
      <header className="card-header">
        <p className="card-header-title clipped-title">{title}</p>
        <span className="card-header-icon">
          <span className="tag is-danger">{rating}</span>
        </span>
      </header>
      <footer className="card-footer">
        <p className="card-footer-item">
          {type === "movie" ? (
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
              <span>TV</span>
            </span>
          )}
        </p>
        <p className="card-footer-item">
          <span className="icon-text">
            <span className="icon">
              <FcLike />
            </span>
            <span>{like || 0}</span>
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Card;
