import DarkMode from './components/DarkMode'
import Planet from './components/Planet'
import People from './components/People'
import Starship from './components/Starship'
import Select from './components/Select'
import React, { useState, useEffect } from 'react'

function App() {
  const [api, setApi] = useState("planets")

  const selectApi = (event) => {
    setApi(event.target.value)
  }

  return (
    <DarkMode>
      <section className="container py-5">
        <Select selectApi={selectApi} />
        {api === "planets" && (<Planet />)}
        {api === "peoples" && (<People />)}
        {api === "starships" && (<Starship />)}
      </section>
    </DarkMode>
  );
}

export default App;
