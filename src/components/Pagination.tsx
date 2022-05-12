import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

export interface PaginationProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const goToPreviousPage = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToNextPage = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (currentPage < 10) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="container mb-6">
      <div className="block">
        <nav
          className="pagination is-rounded is-small"
          role="navigation"
          aria-label="pagination"
        >
          <span
            title="Previous"
            className={`pagination-previous is-clickable ${
              currentPage <= 1 ? "is-hidden" : ""
            }`}
            onClick={goToPreviousPage}
          >
            <MdOutlineArrowBackIos />
          </span>
          <span
            title="Next"
            className={`pagination-next is-clickable ${
              currentPage >= 10 ? "is-hidden" : ""
            }`}
            onClick={goToNextPage}
          >
            <MdOutlineArrowForwardIos />
          </span>
          <ul className="pagination-list">
            {pages.map((page) => (
              <li key={page}>
                <span
                  title={`Goto page ${page}`}
                  className={`is-clickable pagination-link ${
                    currentPage === page ? "is-current" : ""
                  }`}
                  aria-label={`Goto page ${page}`}
                  onClick={(e) => setCurrentPage(page)}
                >
                  {page}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
