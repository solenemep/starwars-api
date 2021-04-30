import React, { useState, useEffect } from "react"

const Starship = () => {
  const [starships, setStarships] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const handleButtonClick = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.dev/api/starships/?page=${page}`)
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
        setStarships(starships => [...starships, ...data.results]);
        setHasNext(!!data.next);
      })
      .catch((error) => console.log(error.message));
  }, [page]);

  return (
    <React.Fragment>
      <h1 className="mb-5">People in Star Wars universe</h1>
      <div className="row">
        {starships.map((starship) => {
          return (
            <div key={starship.name} className="col-md-6 col-lg-4 col-xl-3 mb-4">
              <article className="bg-danger p-3">
                <h2 className="h5">{starship.name}</h2>
                <p className="mb-0">
                  <b>model</b> <br /> {starship.model}
                </p>
                <p className="mb-0">
                  <b>max speed</b> <br /> {starship.max_atmosphering_speed}
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
      { !hasNext && <p className="bg-dark text-white p-3">We have listed all starships.</p>}

    </React.Fragment>)
}
export default Starship