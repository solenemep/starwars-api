import React, { useState, useEffect } from "react"

const Film = () => {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const handleButtonClick = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.dev/api/films/?page=${page}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          "We could not get informations."
        );
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
        setFilms(films => [...films, ...data.results]);
        setHasNext(!!data.next);
      })
      .catch((error) => console.log(error.message));
  }, [page]);

  return (
    <React.Fragment>
      <h1 className="mb-5">Films of Star Wars</h1>
      <div className="row">
        {films.map((film) => {
          return (
            <div key={film.episode_id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
              <article className="bg-secondary p-3">
                <h2 className="h5">{film.title}</h2>
                <p className="mb-0">
                  <b>episode</b> <br /> {film.episode_id}
                </p>
                <p className="mb-0">
                  <b>release date</b> <br /> {film.release_date}
                </p>
              </article>
            </div>
          );
        })}
        {loading && (
          <div className="mb-4 text-center p-3">loading...</div>
        )}
      </div>
      {
        !loading && hasNext && (
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleButtonClick}
            disabled={loading}
          >
            Next
          </button>
        )
      }
      { !hasNext && <p className="bg-dark text-white p-3">We have listed all films.</p>}

    </React.Fragment>)
}
export default Film