import DarkMode from './components/DarkMode'
import Film from './components/Film'
import Planet from './components/Planet'
import People from './components/People'
import Starship from './components/Starship'
import Select from './components/Select'
import React, { useState, useEffect } from 'react'

function App() {
  const [active, setActive] = useState(false);


  const [api, setApi] = useState(JSON.parse(localStorage.getItem('starWarsApi')) || 'planets')
  const selectApi = (event) => {
    setApi(event.target.value)
  }
  useEffect(() => {
    localStorage.setItem("starWarsApi", JSON.stringify(api), [api])
  }
  )

  return (

    <DarkMode>
      <section className="container py-3">
        <Select api={api} selectApi={selectApi} />
        <div className="form-check form-switch mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="activate"
            onChange={() => setActive((active) => !active)}
          />
          <label className="form-check-label" htmlFor="activate">
            Activer
        </label>
        </div>
        {active &&
          <React.Fragment>
            {api === "films" && (<Film />)}
            {api === "planets" && (<Planet />)}
            {api === "people" && (<People />)}
            {api === "starships" && (<Starship />)}
          </React.Fragment>
        }


      </section >
    </DarkMode>


  );
}

export default App;
