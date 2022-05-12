import { MdNotListedLocation } from "react-icons/md";

const NotFoundPage = () => {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <section>
          <div className="icon-text">
            <MdNotListedLocation className="icon is-large has-text-info" />
            <h1 className="title is-1">404 Not Found</h1>
          </div>
          <p className="block ml-6">
            The page you are looking for does not exist
          </p>
        </section>
      </div>
    </section>
  );
};

export default NotFoundPage;
