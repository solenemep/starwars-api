import DarkMode from './components/DarkMode'
import Film from './components/Film'
import Planet from './components/Planet'
import People from './components/People'
import Starship from './components/Starship'
import Select from './components/Select'
import React, { useState, useEffect } from 'react'

function App() {
  const [api, setApi] = useState(JSON.parse(localStorage.getItem('starWarsApi')) || 'planets')

  const selectApi = (event) => {
    setApi(event.target.value)
  }
  useEffect(() => {
    localStorage.setItem("starWarsApi", JSON.stringify(api), [api])
  }
  )

  return (
    <section className="container py-5">
      <DarkMode>

        <Select selectApi={selectApi} />
        {api === "films" && (<Film />)}
        {api === "planets" && (<Planet />)}
        {api === "peoples" && (<People />)}
        {api === "starships" && (<Starship />)}

      </DarkMode>
    </section >

  );
}

export default App;
