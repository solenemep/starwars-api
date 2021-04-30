import React, { useState, useEffect } from "react"

const Planet = () => {
  const [planets, setPlanets] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const handleButtonClick = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.dev/api/planets/?page=${page}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          "Nous n'avons pas pu récupérer des informations requises."
        );
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
        setPlanets(planets => [...planets, ...data.results]);
        setHasNext(!!data.next);
      })
      .catch((error) => console.log(error.message));
  }, [page]);

  return (
    <React.Fragment>
      <h1 className="mb-5">Planets in Star Wars universe</h1>
      <div className="row">
        {planets.map((planet) => {
          return (
            <div key={planet.name} className="col-md-6  col-lg-4 col-xl-3 mb-4">
              <article className="bg-warning p-3">
                <h2 className="h5">{planet.name}</h2>
                <p className="mb-0">
                  <b>population</b> <br /> {planet.population}
                </p>
                <p className="mb-0">
                  <b>climat</b> <br /> {planet.climate}
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
      { !hasNext && <p className="bg-dark text-white p-3">We have listed all planets.</p>}

    </React.Fragment>)
}
export default Planet