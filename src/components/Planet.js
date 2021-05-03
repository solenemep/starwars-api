import React, { useState, useEffect, useRef } from "react"

const Planet = () => {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(null);
  const cancelRef = useRef(null)
  const controllerRef = useRef(null)

  useEffect(() => {
    cancelRef.current = false
    controllerRef.current = new AbortController()
    // mounts
    console.log("I mounted")
    return () => {
      //unmounts
      console.log("I unmount")
      cancelRef.current = true
      controllerRef.current.abort()
    }
  }, [])

  // Page
  const handleButtonClick = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    console.log("use effect starts with ", page)
    console.log(cancelRef)
    /*let isCancelled = false
    const controller = new AbortController()
    //signal: controller.signal
    }) */
    setLoading(true);
    fetch(`https://swapi.dev/api/planets/?page=${page}`, {
      signal: controllerRef.current.signal
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          `We could not get informations, status : ${response.status}`
        );
      })
      .then((data) => {
        console.log("I get data")
        console.log(data)
        if (!cancelRef.current) {
          console.log("will run setPlanets, update component");
          setPlanets(planets => [...planets, ...data.results]);
          setLoading(false);
          setHasNext(data.next ? true : false);
        }
      })
      .catch((error) => {
        if (!cancelRef.current) {
          setError(error.message)
          console.log(error.message)
          setLoading(false)
        }
      });
    return () => {
      /*console.log("clean up")
       console.log("I want to cancel")
       isCancelled = true
       controller.abort()*/
    }
  }, [page]);

  return (
    <React.Fragment>
      <h1 className="mb-3">Planets in Star Wars universe</h1>
      <div className="row">
        {planets.map((planet) => {
          return (
            <div key={planet.name} className="col-md-6 col-lg-4 col-xl-3 mb-4">
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
      </div>
      {loading && <p className="text-center">loading...</p>}
      {!!error && <p className="alert alert-danger">{error}</p>}
      {!loading && hasNext && (
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