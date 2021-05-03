const Select = (props) => {
  const { selectApi } = props
  return (
    <div className="col-12 btn-group btn-group-sm mb-5 p-0">
      <button className="btn btn-secondary" type="button" id="button-films" value="films" onClick={selectApi}>Films</button>
      <button className="btn btn-warning" type="button" id="button-planets" value="planets" onClick={selectApi}>Planets</button>
      <button className="btn btn-primary" type="button" id="button-peoples" value="peoples" onClick={selectApi}>Peoples</button>
      <button className="btn btn-danger" type="button" id="button-starships" value="starships" onClick={selectApi}>Starships</button>
    </div>
  )
}
export default Select