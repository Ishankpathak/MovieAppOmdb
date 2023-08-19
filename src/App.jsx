import { useEffect } from "react";
import { useState } from "react";
import noimage from "./assets/noimage.png";

const App = () => {
  const [searchText, setSearchText] = useState("batman");
  const [moviesList, setMovieList] = useState([]);
  const [totalResults, setTotalResults] = useState();

  const [page, setPage] = useState(1);

  const handleSearchBtn = async () => {
    console.log(searchText);
    let res = await fetch(
      `https://www.omdbapi.com/?apikey=57184f3e&s=${searchText}&page=${page}`
    );
    let moviesData = await res.json();
    console.log(moviesData.Search);
    setMovieList(moviesData.Search);
    setTotalResults(moviesData.totalResults);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
    scrollToTop();
  };

  const handleNextPage = () => {
    setPage(page + 1);
    scrollToTop();
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls smoothly to the top
  };
  useEffect(() => {
    handleSearchBtn();
  }, [page]);

  return (
    <>
      <div className="heading">
        <p>MovieMania</p>
      </div>
      <div className="Main-Container">
        <input
          type="text"
          placeholder="Search Any Movie"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearchBtn}>Show Results</button>
      </div>

      {/* Movie result  */}
      <div className="results">
        <p>Total results:- {totalResults} </p>
      </div>

      <div className="data-container">
        {moviesList ? (
          moviesList.map((item) => (
            <div key={item.imdbID} className="movie-data">
              <img
                src={item.Poster !== "N/A" ? item.Poster : noimage}
                alt={item.Title}
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "0.3rem",
                }}
              />
              <p className="data-title">Title :- {item.Title}</p>
              <p className="data-year">Year :- {item.Year}</p>
            </div>
          ))
        ) : (
          <div style={{ height: "50vh" }}>No Data Found</div>
        )}
      </div>

      <div className="btn">
        <button onClick={handlePreviousPage} disabled={page <= 1}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div>Page :- {page}</div>
        <button onClick={handleNextPage} disabled={page >= totalResults / 10}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </>
  );
};

export default App;
