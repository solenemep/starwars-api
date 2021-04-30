import React, { useState, useEffect } from "react"

const People = () => {
  const [peoples, setPeoples] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasNext, setHasNext] = useState(true);

  const handleButtonClick = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.dev/api/people/?page=${page}`)
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
        setPeoples(peoples => [...peoples, ...data.results]);
        setHasNext(!!data.next);
      })
      .catch((error) => console.log(error.message));
  }, [page]);

  return (
    <React.Fragment>
      <h1 className="mb-5">People in Star Wars universe</h1>
      <div className="row">
        {peoples.map((people) => {
          return (
            <div key={people.name} className="col-md-6 col-lg-4 col-xl-3 mb-4">
              <article className="bg-primary p-3">
                <h2 className="h5">{people.name}</h2>
                <p className="mb-0">
                  <b>gender</b> <br /> {people.gender}
                </p>
                <p className="mb-0">
                  <b>films</b> <br /> {people.films.length}
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
      { !hasNext && <p className="bg-dark text-white p-3">We have listed all people.</p>}

    </React.Fragment>)
}
export default People